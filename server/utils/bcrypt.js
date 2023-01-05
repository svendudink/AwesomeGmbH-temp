import bcrypt from "bcrypt";

const hashPassword = async (pass) => {
  try {
    const salt = await bcrypt.genSalt(12);

    const hash = await bcrypt.hash(pass, salt);

    return hash;
  } catch (err) {
    console.log(err);
  }
};

const verifyPassword = async (password, hash) => {
  console.log(password, hash);
  const verified = await bcrypt.compare(password, hash);
  console.log("verified", verified);
  return verified;
};

export { hashPassword, verifyPassword };
