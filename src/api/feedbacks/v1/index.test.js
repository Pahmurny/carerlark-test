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

describe('GET api/v1/feedbacks/:id', () => {
  it('should return feedback data by id', async () => {
    const { status, body } = await request.get(`/${feedback1.dataValues.id}`);
    expect(status).toBe(200);
    expect(body.id).toBe(feedback1.dataValues.id);
    expect(body.request.id).toBe(request1.dataValues.id);
    expect(body.requester.id).toBe(user2.dataValues.id);
    expect(body.giver.id).toBe(user1.dataValues.id);
    expect(body.receiver.id).toBe(user2.dataValues.id);
  });
  it('should return 404 for invalid id', async () => {
    const { status, body } = await request.get('/random-string');
    expect(status).toBe(404);
    expect(body).toBe('');
  });
});

describe('PATCH api/v1/feedbacks/:id', () => {
  it('should update feedback data by id', async () => {
    const { status, body } = await request.patch(`/${feedback1.dataValues.id}`)
      .send([{
        path: 'comment',
        value: 'Updated test comment',
      }]);
    expect(status).toBe(200);
    expect(body.id).toBe(feedback1.dataValues.id);
    expect(body.comment).toBe('Updated test comment');
    const updtedFeedback = await db.Feedback.findById(feedback1.dataValues.id);
    expect(updtedFeedback.comment).toBe('Updated test comment');
  });
  it('should return 404 for invalid id', async () => {
    const { status, body } = await request.patch('/random-string');
    expect(status).toBe(404);
    expect(body).toBe('');
  });
});
