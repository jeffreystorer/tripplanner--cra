const detailsArray = [
  { astart: '2022-07-01' },
  { astart: '2022-06-01' },
  { astart: '2022-05-01' },
];
detailsArray.sort(function (a, b) {
  let x = a.astart.toLowerCase();
  let y = b.astart.toLowerCase();
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
});
console.log(detailsArray);
