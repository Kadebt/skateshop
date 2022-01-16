const reviewscontroller = require("./reviewscontroller")

module.exports = {
    getInventory: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params 

        const products = await db.get_inventory(id)

        return res.status(200).send(products)
    },

    getFullItem: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params 

        const fullItem = await db.get_fullItem(id)

        res.status(200).send(fullItem)
    },

    addToCart: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        const item = await db.get_item(id)

        if(req.session.cart){
            req.session.cart = [...req.session.cart, item[0]]
            res.status(200).send(req.session.cart)
        } else {
            req.session.cart = item
            res.status(200).send(req.session.cart)
        }
    },

    getCart: async (req, res) => {
        if(req.session.cart){
            res.status(200).send(req.session.cart)
        } else {
            res.status(200).send('Your Cart is Empty!')
        }
    },

    deleteItem: async (req, res) => {
        // const db = req.app.get('db')
        const { id } = req.params
        const arr = req.session.cart

       for(i = 0; i < arr.length - 1; i++){
           if(arr[i].id === id){
               arr.splice(i, 1)
           }
       }
     },

     addQuantity: async (req, res) => {
         let { id } = req.params
        id = parseInt(id, 10)
         
         for(let i = 0; i < req.session.cart.length; i++){
             let price = req.session.cart[i].price 
             if(req.session.cart[i].id === id){
                 req.session.cart[i].price = price + price
                 res.status(200).send(req.session.cart)
             }
         }
         
     },

     filterBy: async (req, res) => {
         const db = res.app.get('db')

         const { brand } = req.query
         const { min, max } = req.query
         const { sizemin, sizemax} = req.query

        //  const items = await db.get_items(id)

        if(brand){
            const brandsfiltered = await db.get_brands(brand)
            return res.status(200).send(brandsfiltered)
        }

        if(max){
            const pricefiltered = await db.get_price(min, max)
            return res.status(200).send(pricefiltered)
        }

        if(sizemin) {
            const sizefiltered = await db.get_size(sizemin, sizemax)
            return res.status(200).send(sizefiltered)
        } else {
            return res.status(404).send('cannot filter')
        }
     }

}