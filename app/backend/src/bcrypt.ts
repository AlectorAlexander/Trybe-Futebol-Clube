import bcrypt = require('bcryptjs');

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password: string, hash: string) => bcrypt.compareSync(password, hash);

export default { hashPassword, comparePassword };
