import * as dotenv from "dotenv";

dotenv.config();
export const config = {
  Auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    secret: process.env.AUTH0_CLIENT_SECRET,
    url: process.env.AUTH0_CALLBACK_URL,
  },
};
