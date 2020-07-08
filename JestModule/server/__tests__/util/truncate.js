import database from '../../src/database';

const truncate = () => {
  const { models } = database.connection;
  return Promise.all(
    Object.keys(models).map(model =>
      models[model].destroy({ truncate: true, force: true })
    )
  );
};

export default truncate;
