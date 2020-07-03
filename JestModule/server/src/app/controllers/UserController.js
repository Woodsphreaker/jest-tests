import UserModel from '../models/Users';

const store = async (req, res) => {
  const { name, email, password_hash } = req.body;
  const user = await UserModel.create({ name, email, password_hash });
  return res.json(user);
};

export default { store };
