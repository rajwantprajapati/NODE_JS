const fs = require("fs");

setImmediate(() => {
  console.log("setImmediate callback executed");
});

Promise.resolve("Promise").then(() => {
  console.log("Promise callback executed");
});

fs.readFile("./file.txt", "utf-8", () => {
  console.log("File read callback executed");
});

setTimeout(() => {
  console.log("setTimeout callback executed");
}, 0);

process.nextTick(() => {
  process.nextTick(() => {
    console.log("inner process.nextTick callback executed");
  });

  console.log("outer process.nextTick callback executed");
});

console.log("Last line of the code.");

// ===== OUTPUT =====
// Last line of the code.
// outer process.nextTick callback executed
// inner process.nextTick callback executed
// Promise callback executed
// setTimeout callback executed
// setImmediate callback executed
// File read callback executed
