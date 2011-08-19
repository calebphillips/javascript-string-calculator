var add;
add = function(string) {
  if (!string) {
    return 0;
  }
  return string.split(/[^\d]/).map(function(s) {
    return Number(s);
  }).reduce(function(sum, num) {
    return sum + num;
  });
};
describe('add', function() {
  it('returns 0 for the empty string', function() {
    return expect(add('')).toEqual(0);
  });
  it('returns the number when the string is a single number', function() {
    expect(add('5')).toEqual(5);
    return expect(add('27')).toEqual(27);
  });
  it('returns the sum when the string contains 2 numbers', function() {
    expect(add('1,2')).toEqual(3);
    return expect(add('3,5')).toEqual(8);
  });
  it('returns the sum when the string contains lots of numbers', function() {
    var num, oneHundredTwenties;
    oneHundredTwenties = (function() {
      var _results;
      _results = [];
      for (num = 1; num <= 100; num++) {
        _results.push("20");
      }
      return _results;
    })();
    return expect(add(oneHundredTwenties.join(','))).toEqual(2000);
  });
  it('allows the newline as a delimiter', function() {
    expect(add('1\n2')).toEqual(3);
    return expect(add('3,4\n2')).toEqual(9);
  });
  return it('allows custom delimiters', function() {
    expect(add('//;\n9;4;2')).toEqual(15);
    return expect(add('//x\n2x3x4x4')).toEqual(13);
  });
});