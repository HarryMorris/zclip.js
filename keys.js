obj = {
  a: 'A',
  b: 'B',
  c: 'C'
}

for (var key in obj) {
  console.log(key);
  if (key == 'b') return key;
}
