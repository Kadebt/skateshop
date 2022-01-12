module.exports = {
    getReviews: async (req, res) => {
        const { id } = req.params 

        const reviews = await db.get_reviews(id)

        res.status(200).send(reviews)
    },

    postReview: async (req, res) => {
        const { id } = req.params
        const { name, body } = req.body

        await db.add_review([id, name, body])

        const reviewAdded = await db.get_reviews(id)

        res.status(200).send(reviewAdded)
    },

    deleteReview: async (req, res) => {
        const { id } = req.params

        for(i = 0; i < reviews.length -1; i ++ ){
            if(req.session.user.username === reviews[i].userName){
                reviews.splice(i, 1)
            }
        }
    },


}