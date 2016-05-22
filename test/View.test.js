(function($) {
    
  module('View');

  test('Set data view', function() {
    expect(2);
    equal(View.setData('foo', 'bar'), View);
    equal(JSON.stringify(View.data), '{"foo":"bar"}');
  });
  
  test('Render view', function() {
    expect(1);
    equal(View.render('test.twig', {foo: "bar"}, true), "bar");
  });

}(jQuery));