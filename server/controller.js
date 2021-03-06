const stripe = require("stripe")("sk_test_GSu0sgBzAbw6A8tu24Pef6Dc006YACVeYv");
const reviewscontroller = require("./reviewscontroller");

module.exports = {
  getInventory: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    if (id == 0) {
      const allProducts = await db.get_all();
      return res.status(200).send(allProducts);
    } else {
      const products = await db.get_inventory(id);

      return res.status(200).send(products);
    }
  },

  getFullItem: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    const fullItem = await db.get_fullItem(id);

    res.status(200).send(fullItem);
  },

  addToCart: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    const item = await db.get_item(id);
    console.log(item);

    if (req.session.cart) {
      req.session.cart = [...req.session.cart, item[0]];
      res.status(200).send(req.session.cart);
    } else {
      req.session.cart = item;
      res.status(200).send(req.session.cart);
    }
  },

  getCart: async (req, res) => {
    if (req.session.cart) {
      res.status(200).send(req.session.cart);
    }
  },

  deleteItem: async (req, res) => {
    // const db = req.app.get('db')
    let { id } = req.params;
    console.log(typeof id);
    for (i = 0; i < req.session.cart.length; i++) {
      if (req.session.cart[i].id === Number(id)) {
        req.session.cart.splice(i, 1);
      }
    }
    console.log(req.session.cart);
    res.status(200).send(req.session.cart);
  },

  addQuantity: async (req, res) => {
    let { id } = req.params;
    id = parseInt(id, 10);

    for (let i = 0; i < req.session.cart.length; i++) {
      let price = req.session.cart[i].price;
      if (req.session.cart[i].id === id) {
        req.session.cart[i].price = price + price;
        res.status(200).send(req.session.cart);
      }
    }
  },

  filterBy: async (req, res) => {
    const db = res.app.get("db");

    const { id } = req.params;
    const { brands, min, max, sizemin, sizemax } = req.query;

    // turn string of brands names into an array
    const brandNamesArray = brands
      .split(" ")
      .filter((brandName) => brandName !== "");

    // find a way to spread each brand name inside of the brandNamesArray into the database query
    // await db.
    console.log(id);
    const items = await db.get_inventory(id);
    const filteredItems = items
      .filter((items) => brandNamesArray.includes(items.brand))
      .filter(
        (items) =>
          items.price >= min &&
          items.price <= max &&
          items.size >= sizemin &&
          items.size <= sizemax
      );

    console.log(filteredItems);

    res.status(200).send(filteredItems);
  },

  checkout: async (req, res) => {
    const { items } = req.body;

    const price = (arr = items.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0));

    if (items.length > 0) {
      console.log(price);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      return res.status(404);
    }
  },

  usePoints: async (req, res) => {
    const { points } = req.body;
    const { id } = req.params;
    const db = res.app.get("db");
    console.log(points);

    const newPoints = await db.use_points([id, points]);
    console.log[newPoints];

    res.status(200).send(newPoints[0]);
  },
};
