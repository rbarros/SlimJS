module('SlimView');

test('Set data view', function() {
  expect(2);
  equal(SlimView.setData('foo', 'bar'), SlimView);
  equal(JSON.stringify(SlimView.data), '{"foo":"bar"}');
});

test('Render view', function() {
  expect(1);
  SlimView.render('test.twig', {foo: "bar"}, true);
  equal(JSON.stringify(SlimView.data), '{"foo":"bar"}');
});

test('Set hook', function() {
  expect(2);
  var $app = new window.Slim();
  equal($app.view.setHook({
    'before.dispatch':function(){},
    'after.dispatch':function(){}
  }), window.SlimView);
  propEqual($app.view.hooks, {"before.dispatch":function(){},"after.dispatch":function(){}});
});


