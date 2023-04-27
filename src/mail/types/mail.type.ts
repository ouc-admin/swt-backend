export type SendEmailReturnType = {
  response: boolean;
};

export type VerifyEmailServiceReturnType = {
  response: boolean;
  message: string;
  error: string | null;
};
