// Challenge #3
/*

const avgScoreKoalas = (109 + 95 + 123) / 3;
const avgScoreDolphins = (97 + 112 + 101) / 3;

if (avgScoreDolphins >= 100 && avgScoreDolphins > avgScoreKoalas)
  console.log("Dolphins win the trophy! 🎉");
else if (avgScoreKoalas >= 100 && avgScoreKoalas > avgScoreDolphins)
  console.log("Koalas win the trophy! 🎉");
else if (
  avgScoreDolphins == avgScoreKoalas &&
  avgScoreDolphins >= 100 &&
  avgScoreKoalas >= 100
)
  console.log("Draw 😀");
else console.log("No one wins the trophy 💔");

*/

// Challenge #4

const bill = 430;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
const total = bill + tip;
console.log(
  "The bill was " +
    bill +
    ", the tip was " +
    tip +
    ", and the total value " +
    total
);
