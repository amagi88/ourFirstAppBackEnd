
import { config } from "@/config";
import Auth0Strategy, { StrategyOption } from "passport-auth0";

/**
 * Passport Configuration
 */
export const strategy = new Auth0Strategy(
  {
    domain: config.Auth0.domain,
    clientID: config.Auth0.clientId,
    clientSecret: config.Auth0.secret,
    callbackURL: config.Auth0.url,
  } as StrategyOption,
  (_accessToken, _refreshToken, _extraParams, profile, done) => {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
);
