// import 'reflect-metadata';

// import { Test } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import request from 'supertest';
// import { AppModule } from '@org/api/src/app/app.module';

// describe('E2E – confirmed working flows', () => {
//   let app: INestApplication;
//   let jwtToken: string;

//   // unique per test run
//   const uid = Date.now();
//   const userEmail = `jest-user-${uid}@example.com`;
//   const authEmail = `jest-auth-${uid}@example.com`;
//   const password = '123456';

//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleRef.createNestApplication();
//     app.setGlobalPrefix('api');
//     await app.init();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('POST /api/users – create user', async () => {
//     await request(app.getHttpServer())
//       .post('/api/users')
//       .send({
//         email: userEmail,
//         password,
//       })
//       .expect(201);
//   });

//   it('POST /api/auth/register – register auth user', async () => {
//     await request(app.getHttpServer())
//       .post('/api/auth/register')
//       .send({
//         email: authEmail,
//         password,
//       })
//       .expect(201);
//   });

//   it('POST /api/auth/login – get JWT token', async () => {
//     const res = await request(app.getHttpServer())
//       .post('/api/auth/login')
//       .send({
//         email: authEmail,
//         password,
//       })
//       .expect(201);

//     jwtToken = res.body.access_token;
//     expect(jwtToken).toBeDefined();
//   });

//   it('GET /api/users – protected with JWT', async () => {
//     await request(app.getHttpServer())
//       .get('/api/users')
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .expect(200);
//   });
// });


import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@org/api/src/app/app.module';

describe('E2E – Task Module', () => {
  let app: INestApplication;
  let jwtToken: string;

  const uid = Date.now();
  const authEmail = `jest-task-${uid}@example.com`;
  const password = '123456';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();

    // Register
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ email: authEmail, password })
      .expect(201);

    // Login
    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: authEmail, password })
      .expect(201);

    jwtToken = loginRes.body.access_token;
    expect(jwtToken).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/tasks – create a new task', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/tasks')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'E2E Test Task' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'E2E Test Task');
    expect(res.body).toHaveProperty('completed', false);
  });

  it('GET /api/tasks – list tasks for current user', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/tasks')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/tasks – reject without JWT', async () => {
    await request(app.getHttpServer()).get('/api/tasks').expect(401);
  });
});
