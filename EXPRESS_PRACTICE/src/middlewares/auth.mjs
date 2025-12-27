export const adminAuth = (req, res, next) => {
  const isLoggedIn = true;
  const isAdmin = true;

  console.log("Checking for admin authentication");

  if (!(isLoggedIn && isAdmin)) {
    return res.status(401).send("unauthorized access");
  }

  next();
};

export const userAuth = (req, res, next) => {
  const isLoggedIn = true;

  console.log("Checking for user authentication");

  if (!isLoggedIn) {
    return res.status(401).send("User not unauthorized!!");
  }

  next();
};
