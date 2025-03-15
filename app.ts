import { Router } from "express";
import passport from "passport";
import { loginHandler } from "./auth";

export const router = Router();

router.get(
  "/login",
  passport.authenticate("auth0", { scope: "openid email profile" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/callback", loginHandler);