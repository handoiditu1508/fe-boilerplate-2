const jsonServer = require("json-server");
const app = jsonServer.create();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const router = jsonServer.router(path.join(__dirname, "db.json"))
const middlewares = jsonServer.defaults();
const delayMiddleware = require("./middlewares/delayMiddleware");
const port = 3001;
const delayMiliseconds = 2000;
const upload = multer();
const jwtSecret = "0123456789qwertyuiopasdfghjklzxcvbnm";
const fileDirectory = "public";

// Add middlewares
app.use(middlewares);
app.use(delayMiddleware(delayMiliseconds));

// To handle POST, PUT and PATCH you need to use a body-parser
app.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
app.get("/api/echo", (req, res) => {
  res.json("hello!");
});

app.post("/api/echo", (req, res) => {
  res.status(200).json("added!");
});

// Define a protected route
app.get("/api/protected-echo", (req, res) => {
  if (isAuthorized(req)) {
    res.json("hello!");
  } else {
    res.sendStatus(401);
  }
});

app.post("/api/login", (req, res) => {
  createBearerToken((err, token) => {
    if (err) {
      res.status(401).json(err.message);
    } else {
      let expirationTime = new Date();
      expirationTime.setDate(expirationTime.getDate() + 1);

      res.status(200).json({
        token: token,
        expirationTime,
        user: {
          id: Date.now(),
          userName: "admin1",
          email: "admin1@gmail.com",
          name: req.body.name
        }
      })
    }
  })
});

app.get("/file/*", (req, res) => {
  const filePath = path.join(__dirname, fileDirectory, req.params[0]);
  res.sendFile(filePath, err => {
    if (err) {
      res.sendStatus(404);
    }
  });
});

app.post("/file", upload.single("file"), (req, res) => {
  const destination = path.join(__dirname, fileDirectory, req.body.path);
  const fileName = req.body.name;

  fs.mkdir(destination, { recursive: true }, (err, createdPath) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(path.join(destination, fileName), req.file.buffer, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });

  res.status(200).json({ success: true });
});

app.use("/api", router);

app.listen(port, () => {
  console.log("JSON Server is running on http://localhost:" + port + ". Press Ctrl-C to terminate.");
});

function isAuthorized(req) {
  const bearerHeader = req.headers["Authorization"];
  if (bearerHeader != undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    return true;
  }
  return false;
}

function createBearerToken(callback) {
  const payload = {
    id: Date.now(),
    userName: "admin1",
    email: "admin1@gmail.com"
  };

  jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    audience: [`http://localhost:${port}`],
    expiresIn: "1d",
    issuer: `http://localhost:${port}`,
    jwtid: crypto.randomUUID()
  }, (err, encoded) => {
    callback(err, encoded);
  })
}