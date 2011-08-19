
var add = function(string) {
  var digits = function() {
    var arr = [],
        tokens = string.split(/[^\d|^-]/),
        i = 0;
    for (; i<tokens.length; i++) {
      arr.push(Number(tokens[i]));
    }

    return arr;
  }();

  var negatives = function() {
    var arr = [],
        i = 0;
    for(; i<digits.length; i++) {
      if (digits[i] < 0) {
        arr.push(digits[i]);
      }
    }

    return arr;
  }();

  if (negatives.length) {
    throw "Negatives not allowed: " + negatives.join(', ');
  }

  var sum = 0,
      i = 0;
  for (; i<digits.length; i++) {
    sum += digits[i];
  }
  return sum;
};

describe("add", function() {
  it("returns 0 for the empty string", function() {
    expect(add('')).toEqual(0);
  });

  it ("returns the number when the string is a single number", function() {
    expect(add('5')).toEqual(5);
    expect(add('27')).toEqual(27);
  });

  it ("returns the sum when the string contains 2 numbers", function() {
    expect(add('1,2')).toEqual(3);
    expect(add('3,5')).toEqual(8);
  });

  it ("returns the sum when the string contains lots of numbers", function() {
    var oneHundredTwenties = new Array();
    for (var i=0; i<100; i++) {
      oneHundredTwenties[i] = "20";
    }
    expect(add(oneHundredTwenties.join(','))).toEqual(2000);
  });

  it ("allows the newline as a delimiter", function() {
    expect(add('1\n2')).toEqual(3);
    expect(add('3,4\n2')).toEqual(9);
  });

  it ("allows custom delimiters", function() {
    expect(add('//;\n9;4;2')).toEqual(15);
    expect(add('//x\n2x3x4x4')).toEqual(13);
  });

  it ("does not allow negative number", function() {
    expect(function() { add('-1,4,-5'); }).toThrow();
  });

  it ("includes the negatives in the error message", function () {
    expect(function () { add("-4,5,-65"); }).toThrow("Negatives not allowed: -4, -65")
  });

});

