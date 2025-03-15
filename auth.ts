import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Session } from "express-session"; // express-session の型を拡張する

// express-session の SessionData 型を拡張
declare module "express-session" {
  interface SessionData {
    returnTo?: string;
  }
}

export const loginHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("auth0", (err: any, user: Express.User, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const returnTo = req.session?.returnTo;
      if (req.session) {
        delete req.session.returnTo;
      }
      res.redirect(returnTo || "/");
    });
  })(req, res, next);
};
