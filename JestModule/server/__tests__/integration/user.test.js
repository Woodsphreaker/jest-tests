import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Carlo Enrico',
        email: 'carlo@uol.com.br',
        password_hash: 'jhdjahdkadyewyq',
      });
    expect(response.body).toHaveProperty('id');
  });
});
