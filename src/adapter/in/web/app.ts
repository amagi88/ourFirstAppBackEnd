import express from "express";
import expressSession from "express-session";
import { CipherKey } from "crypto";
import passport from "passport";

import { authenticationRoutes } from "@/adapter/in/web/router/authenticationRouter";
import { strategy } from "@/adapter/in/web/controller/strategyConfig";

const app = express();

// セッション設定
const sessionConfig = {
  secret: process.env.SESSION_SECRET as CipherKey | CipherKey[],
  cookie: { path: "/", httpOnly: true, secure: false, maxAge: 30 * 60 * 1000 },
  resave: false,
  saveUninitialized: false,
  rolling: true,
};

if (app.get("env") === "production") {
  sessionConfig.cookie.secure = true;
}

app.use(expressSession(sessionConfig));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as undefined);
});

app.use("/", authenticationRoutes);

export const server = app;
