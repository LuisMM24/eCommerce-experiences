require("dotenv/config");

const firebaseConfig = {
  type: process.env.FB_CERT_TYPE,
  project_id: process.env.FB_PROJECT_ID,
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FB_PRIVATE_KEY,
  client_email: process.env.FB_CLIENT_EMAIL,
  client_id: process.env.FB_CLIENT_ID,
  auth_uri: process.env.FB_AUTH_URI,
  token_uri: process.env.FB_TOKEN_URI,
  auth_provider_x_509_cert_url: process.env.FB_AUTH_PROVIDER_X_509_CERT_URL,
  client_x_509_cert_url: process.env.CLIENT_X_509_CERT_URL,
};

module.exports = {
  DB_URI: process.env.MONGODB_URI,
  firebaseConfig: firebaseConfig,
};
