module('SlimExceptions');

test('Get response', function() {
  expect(9);
  equal(SlimExceptions.jsonResponse(400), 'Unrecognized command');
  equal(SlimExceptions.jsonResponse(401), 'Permission denied');
  equal(SlimExceptions.jsonResponse(402), 'Missing argument');
  equal(SlimExceptions.jsonResponse(403), 'Incorrect password');
  equal(SlimExceptions.jsonResponse(404), 'Page not found');
  equal(SlimExceptions.jsonResponse(405), 'Email not validated');
  equal(SlimExceptions.jsonResponse(408), 'Token expired');
  equal(SlimExceptions.jsonResponse(411), 'Insufficient privileges');
  equal(SlimExceptions.jsonResponse(500), 'Internal server error');
});