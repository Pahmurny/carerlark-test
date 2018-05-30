import supertest from 'supertest';
import express from '../../../services/express';
import routes from '.';
import db from '../../../db/models';

import { sign } from '../../../services/jwt';

const app = () => express('', routes);
const request = supertest(app());

let user1;
let user2;
let admin;

beforeAll(async () => {
  await db.sequelize.sync();
  user1 = await db.User.create({ name: 'user1', email: 'a@a.com', password: '123456' });
  user1.token = await sign(user1.dataValues.id);
  user2 = await db.User.create({ name: 'user2', email: 'b@b.com', password: '123456' });
  user2.token = await sign(user2.dataValues.id);
  admin = await db.User.create({
    name: 'admin', email: 'c@c.com', password: '123456', role: 'admin',
  });
  admin.token = await sign(admin.dataValues.id);
});

afterAll(async () => {
  await db.sequelize.drop();
});

describe('GET api/v1/users', () => {
  it('should return list of users', async () => {
    const { status, body } = await request.get('/');
    expect(status).toBe(200);
    expect(body.count).toBe(3);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows[0].password).toBeUndefined();
  });
});

describe('GET api/v1/users/me', () => {
  it('should unauthorize requests without token', async () => {
    const { status } = await request.get('/me');
    expect(status).toBe(401);
  });
  it('should return user data for request with token', async () => {
    const { status, body } = await request.get('/me').set('Authorization', `Bearer ${user1.token}`);
    expect(status).toBe(200);
    expect(body.name).toBe(user1.dataValues.name);
    expect(body.password).toBeUndefined();
  });
});

describe('GET api/v1/users/:id', () => {
  it('should return user data by id', async () => {
    const { status, body } = await request.get(`/${user2.dataValues.id}`);
    expect(status).toBe(200);
    expect(body.name).toBe(user2.dataValues.name);
    expect(body.password).toBeUndefined();
  });
  it('should retur 404 for invalid id', async () => {
    const { status, body } = await request.get('/random-string');
    expect(status).toBe(404);
    expect(body).toBe('');
  });
});
