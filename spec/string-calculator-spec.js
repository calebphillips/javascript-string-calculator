var add;
add = function(string) {
  var digits, negatives;
  digits = string.split(/[^\d|^-]/).map(function(s) {
    return Number(s);
  });
  negatives = digits.filter(function(d) {
    return d < 0;
  });
  if (negatives.length) {
    throw "Negatives not allowed: " + negatives.join(', ');
  }
  return digits.reduce(function(sum, num) {
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
  it('allows custom delimiters', function() {
    expect(add('//;\n9;4;2')).toEqual(15);
    return expect(add('//x\n2x3x4x4')).toEqual(13);
  });
  it('does not allow negative numbers', function() {
    return expect(function() {
      return add('-1,4,-5');
    }).toThrow();
  });
  return it('includes the negatives in the error message', function() {
    return expect(function() {
      return add('-4,5,-65');
    }).toThrow("Negatives not allowed: -4, -65");
  });
});