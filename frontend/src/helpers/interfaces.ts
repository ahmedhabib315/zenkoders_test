export interface Login {
  email: string;
  password: string;
}

export interface Signup extends Login {
  name: string;
}

export interface ApiResponse {
  msg?: string;
  code?: number;
  data?: any;
}

export interface TransitionModalProps {
  open: boolean;
  handleClose: any;
  currentNews: any;
}

export interface PaymentModalProps {
  open: boolean;
  handleClose: any;
  package: any;
}

export interface UserDetails {
  access_token: string
}

export interface NewsPayload {
  category?: string
  q?: string
}