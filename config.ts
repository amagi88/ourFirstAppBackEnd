export const config = {
  Auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENTID,
    secret: process.env.AUTH0_SECRET,
    url: process.env.AUTH0_CALLBACK_URL
  },
};
