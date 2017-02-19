module('FormData', {
  setup: function() {
    this.formdata = new window.FormData();
  }
});

test('instance', function() {
  expect(1);
  ok(this.formdata, 'instance');
});