import UserModel from '../models/Users';

const store = async (req, res) => {
  const { name, email, password } = req.body;

  const hasEmailInDatabase = await UserModel.findOne({ where: { email } });

  if (hasEmailInDatabase) {
    return res.status(400).json({ message: 'email already in database' });
  }

  const user = await UserModel.create({ name, email, password });
  return res.json(user);
};

export default { store };
