import express from "express";
import usersJson from "./databases/users.json";
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();

app.use(bodyParser());

app.set("view engine", "pug");

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "bonjour" });
});

app.get("/users", (req, res) => {
  res.json(usersJson);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id > usersJson.length) {
    res.send("nope");
  }
  const user = usersJson.filter((user) => user.id == req.params.id);
  res.json(user);
});

app.get("/user/add", (req, res) => {
  res.render("partials/useradd");
});

app.post("/users", (req, res) => {
  let { name, username, email } = req.body;
  const user = {
    id : usersJson.length + 1,
    name,
    username,
    email,
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };

  console.log(user);
  usersJson.push(user);
  fs.writeFileSync('./databases/users.json', JSON.stringify(usersJson, null, 4));


  res.redirect("/");
});

app.get("/time", (req, res) => {
  const date = new Date();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
