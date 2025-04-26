import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const login = (req: Request, res: Response, next: NextFunction) => {
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
      // NOTE: 現状ページがないのでコメントアウト
      //   const returnTo = req.session?.returnTo;
      //   if (req.session) {
      //     delete req.session.returnTo;
      //   }
      res.redirect("/tmp");
    });
  })(req, res, next);
};
