/**
 *  we can define routing using methods of the Express app object
 *  1. app.METHOD (app.get, app.post, app.put, app.delete)
 *  2. app.use() to specify middleware as the callback function
 *  3. app.all() used to load middleware functions at a path for all HTTP request methods.
 */

import express from "express";
import { adminAuth, userAuth } from "./middlewares/auth.mjs";

const app = express();

// ====== Route methods ======
app.get("/customer", (req, res) => {
  // second argument callback fn is known as route handler
  res.send("GET customer request");
});

app.post("/customer", (req, res) => {
  res.send("POST customer request");
});

// ====== app.all() ======
app.all("/secret", (req, res) => {
  res.send("handles all http methods using this /secret api route");
});

// ======= app.use() ======
app.use("/profile", (req, res) => {
  res.send("handles all http methods using this /profile api route");
});

// ====== Route parameters =======
// http://localhost:3000/users/34/books/8989
app.get("/users/:userId/books/:bookId", (req, res) => {
  console.log("req params: ", req.params); //{ "userId": "34", "bookId": "8989" }

  res.send(req.params);
});

// ====== Route Handlers =======
// Route handlers can be in the form of a function, an array of functions, or combinations of both

// More than one callback functions
// Callback functions which are in the middle are known are middleware and the callback fun which sends the resp is known as request handler
// this mechanism is used to impose pre-conditions on a route
app.get("/product/:id", (req, res, next) => {
  if (req.params.id === "1") {
    next();
  }

  res.send(`User ${req.params.id}`);
});

app.get("/product/:id", (req, res) => {
  res.send(`Special handler for ${req.params.id}`);
});

app.get(
  "/example/a",
  (req, res, next) => {
    console.log("Response will be send by next route handler");

    next();
  },
  (req, res) => {
    res.send("Response from 2nd Route handler");
  },
);

// An array of callback functions can handle a route.
const cb0 = (req, res, next) => {
  console.log("CB0");

  next();
};

const cb1 = (req, res, next) => {
  console.log("CB1");

  next();
};

const cb2 = (req, res, next) => {
  console.log("CB2");

  res.send("Response from CB2");
};

app.get("/example/c", [cb0, cb1, cb2]);

// A combination of independent functions and arrays of functions can handle a route.
app.get(
  "/example/d",
  [cb0, cb1],
  (req, res, next) => {
    console.log("Response will be send from next handler");

    next();
  },
  (req, res) => {
    res.send("Response from last route handler");
  },
);

// ========== Middleware examples =========

/**
 * Admin routes
 */
app.use("/admin", adminAuth);
app.get("/admin/get-all-data", (req, res) => {
  res.send("All user data sent");
});

app.delete("/admin/delete-user", (req, res) => {
  res.send("User deleted!!");
});

/**
 * User Routes
 */

app.get("/user", userAuth, (req, res) => {
  res.send("User data sent!!");
});

app.get("/user/login", (req, res) => {
  res.send("User logged in successfully!!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
