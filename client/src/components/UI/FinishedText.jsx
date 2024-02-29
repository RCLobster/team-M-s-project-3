const unfinishedText = "__ __ to the __ to get __".split('__');
const words = ["Jeff", "skeedaddled", "Walmart Super Center", "ammo"]
const finishedText = unfinishedText.map((text) => {
    text.replace('__', words)
}).concat('');

console.log(finishedText)