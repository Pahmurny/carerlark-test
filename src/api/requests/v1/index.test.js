import supertest from 'supertest';
import express from '../../../services/express';
import routes from '.';
import db from '../../../db/models';

import { generateTestData } from '../../../test';

const app = () => express('', routes);
const request = supertest(app());

let company1;
let company2;
let user1;
let user2;
let admin;
let request1;
let request2;
let feedback1;
let feedback2;
let feedback3;

beforeAll(async () => {
  await db.sequelize.drop();
  await db.sequelize.sync();
  const result = await generateTestData();
  ({
    company1,
    company2,
    user1,
    user2,
    admin,
    request1,
    request2,
    feedback1,
    feedback2,
    feedback3,
  } = result);
});

afterAll(async () => {
  await db.sequelize.drop();
  await db.sequelize.close();
});

describe('GET api/v1/requests/', () => {
  it('should return list of request', async () => {
    const { status, body } = await request.get('/').set('Authorization', `Bearer ${user1.token}`);
    expect(status).toBe(200);
    expect(body.count).toBe(2);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(2);
  });
});
