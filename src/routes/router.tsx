import { createBrowserRouter } from "react-router";
import App from "@/App";
import AuthPage from "@pages/auth";
import {LoginForm, SignupForm, VerifyOtpForm, ForgetPassword, ResetPasswordForm} from "@features/auth/index";
import { RoutePath } from "./routePath";





const router = createBrowserRouter([
    {
        path:RoutePath.HOME,
        Component: App,
    },
    {
        path:RoutePath.AUTH,
        Component: AuthPage,
        children:[
            { index:true, Component:LoginForm },
            { path:RoutePath.LOGIN, Component:LoginForm },
            { path:RoutePath.REGISTER, Component:SignupForm},
            { path:RoutePath.VERIFYOTP, Component:VerifyOtpForm },
            { path:RoutePath.FORGETPASSWORD, Component:ForgetPassword },
            { path:RoutePath.RESETPASSWORD, Component:ResetPasswordForm },
        ]
    },
]);

export default router;