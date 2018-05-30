import supertest from 'supertest';
import express from '../../../services/express';
import routes from '.';
import db from '../../../db/models';
import { sign } from '../../../services/jwt';

import testData from '../../../test/store';

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
  await db.sequelize.sync();
  company1 = await db.Company.create(testData.company1);
  company2 = await db.Company.create(testData.company2);
  user1 = await db.User.create({ ...testData.user1, company_id: company1.dataValues.id });
  user1.token = await sign(user1.dataValues.id);
  user2 = await db.User.create({ ...testData.user2, company_id: company2.dataValues.id });
  user2.token = await sign(user2.dataValues.id);
  admin = await db.User.create(testData.userAdmin);
  admin.token = await sign(admin.dataValues.id);
  request1 = await db.FeedbackRequest.create({
    ...testData.request1,
    person_about: user1.dataValues.id,
    givers: [user1.dataValues.id, user2.dataValues.id],
    requester_id: user2.dataValues.id,
  });
  request2 = await db.FeedbackRequest.create({
    ...testData.request2,
    person_about: user1.dataValues.id,
    givers: [user1.dataValues.id, user2.dataValues.id],
    requester_id: user2.dataValues.id,
  });
  feedback1 = await db.Feedback.create({
    ...testData.feedback1,
    requester_id: user2.dataValues.id,
    person_about: user1.dataValues.id,
    giver_id: user1.dataValues.id,
    receiver_id: user2.dataValues.id,
    request_id: request1.dataValues.id,
  });
  feedback2 = await db.Feedback.create({
    ...testData.feedback2,
    requester_id: user2.dataValues.id,
    person_about: user1.dataValues.id,
    giver_id: user1.dataValues.id,
    receiver_id: user2.dataValues.id,
    request_id: request1.dataValues.id,
  });
  feedback3 = await db.Feedback.create({
    ...testData.feedback3,
    requester_id: user2.dataValues.id,
    person_about: user1.dataValues.id,
    giver_id: user1.dataValues.id,
    receiver_id: user2.dataValues.id,
    request_id: request1.dataValues.id,
  });
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
    expect(body.company.id).toBe(user1.dataValues.company_id);
    expect(body.password).toBeUndefined();
  });
});

describe('GET api/v1/users/:id', () => {
  it('should return user data by id', async () => {
    const { status, body } = await request.get(`/${user2.dataValues.id}`);
    expect(status).toBe(200);
    expect(body.company.id).toBe(user2.dataValues.company_id);
    expect(body.name).toBe(user2.dataValues.name);
    expect(body.password).toBeUndefined();
  });
  it('should retur 404 for invalid id', async () => {
    const { status, body } = await request.get('/random-string');
    expect(status).toBe(404);
    expect(body).toBe('');
  });
});

describe('GET api/v1/users/:id/requests', () => {
  it('should return requests list for user with requests', async () => {
    const { status, body } = await request.get(`/${user2.dataValues.id}/requests`);
    expect(status).toBe(200);
    expect(body.count).toBe(2);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(2);
  });
  it('should return requests list for user without requests', async () => {
    const { status, body } = await request.get(`/${user1.dataValues.id}/requests`);
    expect(status).toBe(200);
    expect(body.count).toBe(0);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(0);
  });
  it('should return requests list for user with requests (limit)', async () => {
    const { status, body } = await request.get(`/${user2.dataValues.id}/requests?limit=1`);
    expect(status).toBe(200);
    expect(body.count).toBe(2);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(1);
    expect(body.rows[0].id).toBe(request1.dataValues.id);
  });
  it('should return requests list for user with requests (limit and offset)', async () => {
    const { status, body } = await request.get(`/${user2.dataValues.id}/requests?limit=1&offset=1`);
    expect(status).toBe(200);
    expect(body.count).toBe(2);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(1);
    expect(body.rows[0].id).toBe(request2.dataValues.id);
  });
});

describe('GET api/v1/users/:id/feedbacks', () => {
  it('should return feedbacks list for user with requests', async () => {
    const { status, body } = await request.get(`/${user2.dataValues.id}/feedbacks`);
    expect(status).toBe(200);
    expect(body.count).toBe(3);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(3);
  });
  it('should return feedbacks list for user without requests', async () => {
    const { status, body } = await request.get(`/${admin.dataValues.id}/feedbacks`);
    expect(status).toBe(200);
    expect(body.count).toBe(0);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(0);
  });
  it('should return feedbacks list for user with requests (limit)', async () => {
    const { status, body } = await request.get(`/${user2.dataValues.id}/feedbacks?limit=1`);
    expect(status).toBe(200);
    expect(body.count).toBe(3);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(1);
    expect(body.rows[0].id).toBe(feedback1.dataValues.id);
  });
  it('should return feedbacks list for user with requests (limit and offset)', async () => {
    const { status, body } = await request.get(`/${user2.dataValues.id}/feedbacks?limit=1&offset=1`);
    expect(status).toBe(200);
    expect(body.count).toBe(3);
    expect(Array.isArray(body.rows)).toBe(true);
    expect(body.rows.length).toBe(1);
    expect(body.rows[0].id).toBe(feedback2.dataValues.id);
  });
});
