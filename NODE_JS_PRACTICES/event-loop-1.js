const fs = require("fs");

var a = 10;

setImmediate(() => {
  console.log("Immediate callback executed");
});

fs.readFile("./file.txt", "utf-8", () => {
  console.log("File read callback executed");
});

setTimeout(() => {
  console.log("SetTimeout callback executed");
}, 0);

const printA = () => {
  console.log("a = ", a);
};

printA();

console.log("Last line of the code.");

//==== Output =====
// a =  10
// Last line of the code.
// SetTimeout callback executed
// Immediate callback executed
// File read callback executed
