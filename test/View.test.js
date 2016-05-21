(function($) {
    
  module('View');

  test('Set data view', function() {
    expect(2);
    equal(View.setData('foo', 'bar'), View);
    equal(View.data, {"foo":"bar"});
  });
  
  test('Render view', function() {
    expect(2);
    equal(View.render('test.twig', null, true), "");
  });

}(jQuery));