const { users } = require("../config/db.js");
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const { username, pass } = req.body;

  if (authenticatedUser(username, pass)) {
    let accessToken = jwt.sign(
      {
        data: pass,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };

    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(401)
      .send("Invalid login. Check username and password");
  }
};

const register = (req, res) => {
  const username = req.body.username;
  const password = req.body.pass;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, pass: password });
      return res
        .status(200)
        .send("User successfully registered. Now you can login");
    }
  } else {
    return res.status(404).send("User already exists!");
  }

  return res.status(404).send("Unable to register user.");
};

const doesExist = (username) => {
  let filterName = users.filter((user) => {
    return user.username === username;
  });

  if (filterName.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.pass === password;
  });

  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

const checkSession = (req, res, next) => {
    if (req.session && req.session.authorization) {
      return next(); 
    } else {
      return res.status(401).send("Unauthorized" );
    }
  };

module.exports = { checkAuth, register, checkSession };
