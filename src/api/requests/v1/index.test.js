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
  jest.setTimeout(30000);
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

describe('GET api/v1/requests/:id/feedbacks', () => {
  it('should return list of feedback for request by id', async () => {
    const { status, body } = await request.get(`/${request1.id}/feedbacks`).set('Authorization', `Bearer ${user1.token}`);
    expect(status).toBe(200);
    expect(body.count).toBe(3);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(3);
  });
});

describe('GET api/v1/requests/:id', () => {
  it('should return request details by request id', async () => {
    const { status, body } = await request.get(`/${request1.id}`).set('Authorization', `Bearer ${user1.token}`);
    expect(status).toBe(200);
    expect(body.id).toBe(request1.id);
  });
});

describe('GET api/v1/requests/:id/pending', () => {
  it('should return list of feedback givers for request by id', async () => {
    const { status, body } = await request.get(`/${request1.id}/pending`).set('Authorization', `Bearer ${user1.token}`);
    expect(status).toBe(200);
    expect(body.count).toBe(2);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(2);
  });
});

describe('POST api/v1/requests/:id/feedback', () => {
  it('should create feedback for request', async () => {
    const { status, body } = await request.post(`/${request1.id}/feedback`)
      .send({ comment: 'comment from test' })
      .set('Authorization', `Bearer ${user1.token}`);
    expect(status).toBe(200);
    expect(body.comment).toBe('comment from test');
    const createdFeedback = await db.Feedback.findById(body.id);
    expect(createdFeedback.comment).toBe('comment from test');
  });
});
