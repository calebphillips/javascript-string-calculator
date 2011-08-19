
add = (string) ->
  digits = string.split(/[^\d|^-]/).map (s) -> Number(s)
  negatives = digits.filter (d) -> d < 0

  throw "Negatives not allowed: " + negatives.join(', ') if negatives.length

  digits.reduce((sum, num) -> sum + num)


describe 'add', ->
  it 'returns 0 for the empty string', ->
    expect(add('')).toEqual 0

  it 'returns the number when the string is a single number', ->
    expect(add('5')).toEqual 5
    expect(add('27')).toEqual 27

  it 'returns the sum when the string contains 2 numbers', ->
    expect(add('1,2')).toEqual 3
    expect(add('3,5')).toEqual 8

  it 'returns the sum when the string contains lots of numbers', ->
    oneHundredTwenties = ("20" for num in [1..100])
    expect(add(oneHundredTwenties.join(','))).toEqual 2000

  it 'allows the newline as a delimiter', ->
    expect(add('1\n2')).toEqual 3
    expect(add('3,4\n2')).toEqual 9

  it 'allows custom delimiters', ->
    expect(add('//;\n9;4;2')).toEqual 15
    expect(add('//x\n2x3x4x4')).toEqual 13

  it 'does not allow negative numbers', ->
    expect(-> add('-1,4,-5')).toThrow()

  it 'includes the negatives in the error message', ->
    expect(-> add('-4,5,-65')).toThrow "Negatives not allowed: -4, -65"

