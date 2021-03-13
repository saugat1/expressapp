const formidable = require("formidable");
const express = require("express");
const app = express();
const path = require("path");
let http = require("http");
const fs = require("fs");
let hbs = require("hbs");
let requests = require("requests");

//partials path
let partialsPath = path.join(__dirname, "/partials");
//register partials now
hbs.registerPartials(partialsPath);

// app.set("view engine", "hbs");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/myviews"));

app.get("/", function (req, res) {
  res.render("index", { title: "this is dynamic title" });
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/users.json", function (req, res) {
  res.sendFile(path.join(__dirname, "/users.json"));
});

app.use(express.static(path.join(__dirname, "/public")));

app.get("/testing", function (req, res, next) {
  requests("http://127.0.0.1:8000/users.json", {})
    .on("data", function (chunk) {
      console.log(chunk);
    })
    .on("end", function (err) {
      if (err) return console.log("connection closed due to errors", err);

      console.log("end");
    });
  res.end("dong");
});

app.get("*", function (req, res) {
  res.render("404");
});

//express default middleware serve static page from public folder

// app.post("/upload", (req, res, next) => {
//   var inputs = formidable.IncomingForm();
//   inputs.parse(req, (err, fields, files) => {
//     console.log(
//       `you have filled your name as ${fields.name} and age as ${fields.age}`
//     );
//   });
//   res.end("hi");
// });

// let server1 = http.createServer();

// server1.on("request", function (req, res) {
//   let stream = fs.createReadStream(__dirname + "/test.txt");

//   stream.on("open", function () {
//     stream.pipe(res);
//   });
// });

// server1.listen(8000, function () {
//   console.log("runninghttp port node js");
// });

// app.get("/test/:id", (req, res) => {
//   if (parseInt(req.params.id) === 30) {
//     res.json({
//       name: "nir magar",
//       age: 20,
//     });
//   } else {
//     res.status(404).json({
//       err: "name is not founded",
//     });
//   }
// });

// app.post("/upload", function (request, res, next) {
//   var file = formidable.IncomingForm();
//   file.parse(request, function (err, fields, files) {
//     if (files.photo.type === "image/png") {
//       return res.status(301).redirect("/");
//     }
//   });
// });

app.listen(8000, (err) => {
  if (err) throw new err();
  console.log("server running on port 87k");
});

// app.use("/public", express.static(path.join(__dirname, "public")));
