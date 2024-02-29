const unfinishedText = "__ __ to the __ to get __";
let finishedText = unfinishedText;
const input = ["Jeff", "skeedaddled", "Walmart Super Center", "ammo"];
input.forEach((word) => {
     finishedText = finishedText.replace('__', word)
});
console.log(finishedText)