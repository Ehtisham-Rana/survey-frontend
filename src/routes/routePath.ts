export const RoutePath = {
  HOME: "/",
  AUTH: "auth",
  LOGIN: "login",
  REGISTER: "register",
  VERIFYOTP: "verify-otp",
  FORGETPASSWORD: "forget-password",
  RESETPASSWORD: "reset-password",

} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];