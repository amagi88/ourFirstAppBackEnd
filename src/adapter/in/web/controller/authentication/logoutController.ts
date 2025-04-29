import { Request, Response, NextFunction } from "express";
import { URL } from "url";
import querystring from "querystring";

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => console.error(err));

  let returnTo = req.protocol + "://" + req.hostname;
  const port = req.socket?.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo =
      process.env.NODE_ENV === "production"
        ? `${returnTo}/`
        : `${returnTo}:${port}/`;
  }

  const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);

  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo,
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL.toString());
};
