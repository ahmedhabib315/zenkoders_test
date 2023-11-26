import * as bcrypt from 'bcrypt';

export const decryptData = async (data: string, hash: string) => {
  return await bcrypt.compare(data, hash)
}