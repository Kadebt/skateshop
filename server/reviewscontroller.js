module.exports = {
    getReviews: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params 

        const reviews = await db.get_reviews(id)

        res.status(200).send(reviews)
    },

    postReview: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        const { review, rating } = req.body
        const userId = req.session.user.id
        const username = req.session.user.username
        console.log(req.body)

        await db.add_review([id , userId, review, rating, username])

        const reviewAdded = await db.get_reviews(id)

        res.status(200).send(reviewAdded)
    },

    deleteReview: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        const reviews = await db.delete_review(id)
    
        // for(let i = 0; i < reviews.length; i++){
        //     if(req.session.user.id === reviews[i].user_id){
        //          reviews.splice(i, 1)
        //     }
        // }
    
        res.status(200).send(reviews)
    },

    editReview: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        const { newreview } = req.body
         console.log(newreview)
        const reviews = db.get_reviews(id)

        for (let i = 0; i < reviews.length; i++){
            if (req.session.user.id === reviews[i].user_id){
                await db.update_review([id, newreview])
                res.status(200).send(reviews)
            } else {
                res.status(401).send('you cannot edit this review')
            }
        }
        
    }
}