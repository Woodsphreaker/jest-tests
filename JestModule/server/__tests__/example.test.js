const sum = (a, b) => a + b;

test('sum 4 + 5 = 9', () => {
  const result = sum(4, 5);

  expect(result).toBe(9);
});
