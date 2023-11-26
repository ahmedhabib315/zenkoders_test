import { PrismaService } from '@libs/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Signin, Signup } from './dto/auth.dto';
import { encryptData } from 'helpers/encrypt-data';
import { Response } from 'src/type/response.type';
import { decryptData } from 'helpers/decrypt-data';
import { constants } from 'src/constants/constants';
import { Tokens } from 'src/type/tokens.type';
import { v4 as uuidv4 } from 'uuid';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private stripeService: StripeService,
  ) {}

  /**
   * This method create a new user
   *
   * @param createUserDto
   * @returns newly created user with user data
   */
  async signupLocal(createUserDto: Signup): Promise<Response> {
    const hash_password = await encryptData(createUserDto.password);

    const userExist = await this.prisma.users.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExist) throw new BadRequestException('Email already exists');

    const newUser = await this.prisma.users.create({
      data: {
        email: createUserDto.email,
        password: hash_password,
        name: createUserDto.name,
      },
    });

    if (newUser) {
      const create_customer = await this.stripeService.createCustomer({
        email: newUser.email,
        user_id: newUser.id,
      });

      await this.prisma.userDetails.create({
        data: {
          user_id: newUser.id,
          customer_id: create_customer.id,
        },
      });
    }

    delete newUser.password;

    return {
      status: true,
      message: 'User created successfully',
      data: newUser,
    };
  }

  /**
   * This method takes parameters varify it by email, password and
   * is_verified ( otp verification )
   * @param loginDto
   * @returns user details along with a pair of access token and refresh token
   */
  async signinLocal(loginDto: Signin): Promise<Response> {
    const user = await this.prisma.users.findFirst({
      where: {
        email: loginDto.email,
      },
      include: {
        user_details: true,
        payments: true,
      },
    });

    if (!user) throw new BadRequestException('User not registered');

    const matched_password = await decryptData(
      loginDto.password,
      user.password,
    );

    if (!matched_password) throw new BadRequestException('Password incorrect');

    // If remember me is checked
    let expiry = constants.default_jwt_access_expiry;
    let expiry_rf = constants.default_jwt_refresh_expiry;
    if (loginDto.remember_me && loginDto.remember_me === true) {
      expiry = constants.jwt_access_expiry;
      expiry_rf = constants.jwt_refresh_expiry;
    }

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.hash,
      expiry,
      expiry_rf,
    );

    await this.updateRt(user.id, tokens.refresh_token);

    delete user.password;
    return {
      status: true,
      message: 'User logged in successfully',
      data: { ...user, ...tokens },
    };
  }

  /**
   * This method find user form the database and set refresh token field to null
   * @param CreateUserDto
   * @returns
   */
  async logout(user_id: number): Promise<Response> {
    const user = await this.prisma.users.update({
      where: { id: user_id },
      data: {
        hash: uuidv4(),
        refresh_token: undefined,
      },
    });

    return {
      status: true,
      message: 'User loggedout successfully',
      data: {},
    };
  }

  /**
   * This method user_id as id and refresh token and generate new pair of
   * access token and refresh token
   * @param id
   * @param refresh_token
   * @returns pair of access token and refresh token
   */
  async refreshToken(id: number, refresh_token: string): Promise<Response> {
    const user = await this.prisma.users.findFirst({
      where: {
        AND: [
          {
            id,
          },
          {
            refresh_token,
          },
        ],
      },
    });

    if (!user) throw new BadRequestException('Refresh token has been expired');

    const tokens = await this.getTokens(user.id, user.email, user.hash);
    await this.updateRt(user.id, tokens.refresh_token);
    return {
      status: true,
      message: 'Jwt token has been updated',
      data: {
        ...tokens,
      },
    };
  }

  /**
   * This method generate a pair of tokens
   * @param user_id
   * @param email
   * @returns a pair of new access and refresh tokens
   */
  async getTokens(
    user_id: number,
    email: string,
    hash: string,
    exp = constants.default_jwt_access_expiry,
    exp_rt = constants.default_jwt_refresh_expiry,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user_id,
          email,
          hash,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: exp,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user_id,
          email,
          hash,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: exp_rt,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  /**
   * This method update the refresh token of respected users
   * @param id
   * @param refresh_token
   */
  async updateRt(id: number, refresh_token: string) {
    await this.prisma.users.update({
      where: { id },
      data: { refresh_token },
    });
  }
}
