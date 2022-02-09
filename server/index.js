const express = require("express");
const massive = require("massive");
require("dotenv").config();
const session = require("express-session");
const authcontroller = require("./authcontroller");
const reviewcontroller = require("./reviewscontroller");
const controller = require("./controller");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const path = require("path");

const app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    secret: SESSION_SECRET,
  })
);
app.post("/auth/login", authcontroller.login);
app.post("/auth/register", authcontroller.register);
app.delete("/auth/logout", authcontroller.logout);
app.get("/auth/check", authcontroller.checkUser);

app.get("/api/inventory/:id", controller.getInventory);
app.get("/api/fullItem/:id", controller.getFullItem);
app.put("/api/cart/:id", controller.addToCart);
app.get("/api/getCart", controller.getCart);
app.delete("/api/deleteItem/:id", controller.deleteItem);
app.put("/api/addQuantity/:id", controller.addQuantity);
app.get("/api/filter/:id", controller.filterBy);
app.post("/api/checkout", controller.checkout);
app.get("/api/newItems", controller.newItems);
app.put("/api/usepoints/:id", controller.usePoints);

app.get("/api/reviews/:id", reviewcontroller.getReviews);
app.post("/api/postreviews/:id", reviewcontroller.postReview);
app.delete("/api/deletereview/:id", reviewcontroller.deleteReview);
app.put("/api/editreview/:id", reviewcontroller.editReview);

app.use(express.static(__dirname + "/../build"));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/../build/index.html'))
// })

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  console.log("db connected");
  app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`));
});
