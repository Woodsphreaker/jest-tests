import request from 'supertest';
import bcrypt from 'bcrypt';
import User from '../../src/app/models/Users';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('verify if user added has encrypted password', async () => {
    const user = await User.create({
      name: 'Carlo Enrico',
      email: 'carlo@uol.com.br',
      password: '123456',
    });

    const comparePasswordsHash = await bcrypt.compare(
      '123456',
      user.password_hash
    );

    expect(comparePasswordsHash).toBe(true);
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Carlo Enrico',
        email: 'carlo@uol.com.br',
        password: '123456',
      });
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Carlo Enrico',
        email: 'carlo@uol.com.br',
        password: '123456',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Carlo Enrico',
        email: 'carlo@uol.com.br',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });
});
