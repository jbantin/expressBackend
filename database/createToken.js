import jwt from "jsonwebtoken";
const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const createToken = async (
  tokenData,
  tokenKey = TOKEN_KEY,
  expiresIn = TOKEN_EXPIRY
) => {
  try {
    const token = await jwt.sign(tokenData, tokenKey, { expiresIn });
    return token;
  } catch (error) {
    throw error;
  }
};
export { createToken };
