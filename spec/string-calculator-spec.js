
var add = function(string) {
  string = string.replace("\n", ",");

  var splitAndAdd = function() {
    var tokens = string.split(',');
    var sum = 0;
    for (var i=0; i<tokens.length; i++) {
      sum += Number(tokens[i]);
    }
    return sum;
  };

  return splitAndAdd();
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

});

