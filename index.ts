import express from "express";
import { router } from "./app";
import { errorHandler } from "./errHandler";
import expressSession from "express-session";
import { CipherKey } from "crypto";
import passport from "passport";
import { strategy } from "./Controller/login";

const app = express();

const session = {
  secret: process.env.SESSION_SECRET as CipherKey | CipherKey[],
  cookie: { path: "/", httpOnly: true, secure: false, maxAge: undefined },
  resave: false,
  saveUninitialized: false,
};

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as undefined);
});

app.use("/", router);

app.listen(8000, () => {
  console.log("Start on port 8000");
});
