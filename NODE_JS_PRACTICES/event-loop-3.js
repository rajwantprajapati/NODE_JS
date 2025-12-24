const fs = require("fs");

setImmediate(() => {
  console.log("setImmediate callback executed");
});

Promise.resolve("Promise").then(() => console.log("Promise callback executed"));

fs.readFile("./file.txt", "utf-8", () => {
  setTimeout(() => {
    console.log("2nd setTimeout callback executed");
  }, 0);

  process.nextTick(() => {
    console.log("2nd process.nextTick callback executed");
  });

  setImmediate(() => {
    console.log("2nd setImmediate callback executed"); // NOTE: this will run first befire 2nd setTimeout callback, since check phase is next after the poll phase
  });

  console.log("File read callback executed");
});

setTimeout(() => {
  console.log("setTimeout callback executed");
}, 0);

process.nextTick(() => {
  console.log("process.nextTick callback executed");
});

console.log("Last line of the code.");

// ===== OUTPUT =====
// Last line of the code.
// process.nextTick callback executed
// Promise callback executed
// setTimeout callback executed
// setImmediate callback executed
// File read callback executed
// 2nd process.nextTick callback executed
// 2nd setImmediate callback executed
// 2nd setTimeout callback executed
