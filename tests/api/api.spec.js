import { test, expect } from '@playwright/test';

test('validar estructura de usuarios', async ({ request }) => {

  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  expect(response.status()).toBe(200);

  const users = await response.json();

  expect(users[0]).toHaveProperty('id');
  expect(users[0]).toHaveProperty('email');
  expect(users[0]).toHaveProperty('name');

});

test('validar email de usuario', async ({ request }) => {

  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  const user = await response.json();

  expect(user.email).toContain('@');

});

test('validación incorrecta (simulación bug)', async ({ request }) => {

  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  const user = await response.json();

  expect(user.name).toBe('Nombre Incorrecto'); // esto fallará

});