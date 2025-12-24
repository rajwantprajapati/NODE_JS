const fs = require("fs");

var a = 10;

setImmediate(() => {
  console.log("setImmediate callback executed");
});

Promise.resolve("Promise").then(() => console.log("Promise callback executed"));

fs.readFile("./file.txt", "utf-8", () => {
  console.log("File read callback executed");
});

setTimeout(() => {
  console.log("setTimeout callback executed");
}, 0);

process.nextTick(() => {
  console.log("process.nextTick callback executed");
});

const printA = () => {
  console.log("a = ", a);
};

printA();

console.log("Last line of the code.");

// ===== OUTPUT =====
// a =  10
// Last line of the code.
// process.nextTick callback executed
// Promise callback executed
// setTimeout callback executed
// setImmediate callback executed
// File read callback executed
