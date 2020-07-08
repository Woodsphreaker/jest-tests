import request from 'supertest';
import bcrypt from 'bcrypt';
import User from '../../src/app/models/Users';
import Factory from '../factory';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('verify if user added has encrypted password', async () => {
    const user = await Factory.create('User', {
      password: '123456',
    });

    const comparePasswordsHash = await bcrypt.compare(
      '123456',
      user.password_hash
    );

    expect(comparePasswordsHash).toBe(true);
  });

  it('should be able to register', async () => {
    const userData = await Factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(userData);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const userData = await Factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userData);

    const response = await request(app)
      .post('/users')
      .send(userData);

    expect(response.status).toBe(400);
  });
});
