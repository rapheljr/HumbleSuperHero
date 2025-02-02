/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Superheroes API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /superheroes - should create a superhero', async () => {
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send({ name: 'Superman', superpower: 'Flying', humilityScore: 9 })
      .expect(201);

    expect(response.body).toMatchObject({
      message: 'Superhero added successfully',
    });
  });

  it('GET /superheroes - should return a sorted superhero list', async () => {
    await request(app.getHttpServer())
      .post('/superheroes')
      .send({ name: 'Batman', superpower: 'Fighting', humilityScore: 8 })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/superheroes')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(1);
    expect(response.body).toEqual(
      [...response.body].sort((a, b) => b.humilityScore - a.humilityScore), // Sorted by humilityScore
    );
  });

  it('POST /superheroes - should return validation error for invalid fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send({ name: 'Spider-man', superpower: 'Sticking', humilityScore: 15 }) // Invalid humility score
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain(
      'humilityScore must not be greater than 10',
    );
  });

  it('POST /superheroes - should return validation error for missing fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send({ name: 'Spider-man', superpower: 'Sticking' }) // Missing humility score
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain(
      'humilityScore must be a number conforming to the specified constraints',
    );
  });
});
