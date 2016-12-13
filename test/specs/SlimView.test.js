module('SlimView');

test('Set data view', function() {
  expect(2);
  equal(SlimView.setData('foo', 'bar'), SlimView);
  equal(JSON.stringify(SlimView.data), '{"foo":"bar"}');
});

/*
test('Render view', function() {
  expect(1);
  equal(View.render('test.twig', {foo: "bar"}, true), "bar");
});
*/
