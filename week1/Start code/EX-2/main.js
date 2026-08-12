
//  TODO - You need to import Duration to use it
import {Duration} from "./Duration.js"

const d1 = Duration.fromMinutesAndSeconds(2, 30);
 
const d2 = Duration.fromMinutesAndSeconds(1, 45);

const d3 = d1.plus(d2);
console.log("D3:", d3.toString()); // "4m 15s"

const d4 = d1.minus(d2);
console.log("D4:", d4.toString()); // "0m 45s"

console.log("D1: ",d1.toString()); // "2m 30s" (original unchanged)