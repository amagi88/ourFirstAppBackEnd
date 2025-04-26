import { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface Session extends SessionData {
    returnTo?: string;
  }
}
export const checkLoginStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};
