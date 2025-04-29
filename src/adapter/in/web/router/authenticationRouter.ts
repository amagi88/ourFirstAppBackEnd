import { Router } from "express";
import passport from "passport";
import { login } from "@/adapter/in/web/controller/authentication/loginController";
import { logout } from "@/adapter/in/web/controller/authentication/logoutController";
import { checkLoginStatus } from "@/adapter/in/web/middlewear/checkAuthentication";

const router = Router();

router.get(
  "/login",
  passport.authenticate("auth0", { scope: "openid email profile" })
);
router.get("/callback", login);
// NOTE: ログインが完了したときに飛ばされるURLの仮置き
router.get("/tmp", checkLoginStatus, (_req, res) => res.json("認証成功"));
router.get("/logout", logout);

export const authenticationRoutes = router;
