const env = {
  DEV_FRONTEND_URI: process.env.DEV_FRONTEND_URI,
  PROD_FRONTEND_URI: process.env.PROD_FRONTEND_URI,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  ADMIN_COOKIE_NAME: process.env.ADMIN_COOKIE_NAME,
  MGMT_COOKIE_NAME: process.env.MGMT_COOKIE_NAME,
  USER_COOKIE_NAME: process.env.USER_COOKIE_NAME,
  ADMIN_COOKIE_SEC: process.env.ADMIN_COOKIE_SEC,
  MGMT_COOKIE_SEC: process.env.MGMT_COOKIE_SEC,
  USER_COOKIE_SEC: process.env.USER_COOKIE_NAME,
};

for (const [key, value] of Object.entries(env)) {
  if (typeof value !== "string" || !value) {
    throw new Error(
      `❌ Environment variable ${key} is not defined. Contact developer`,
    );
  }
}

export default env;
