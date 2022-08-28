import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController{


  static async apiPostReview(req, res, next){
    try {
      const movieId = req.body.movie_id
      const review = req.body.review
      const userInfo = {

        name: req.body.name, 
        _id: req.body.user_id
      }

      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview(
        movieId, userInfo, review, date
      )
      res.json({status: "Successfully posted movie Review"})

    } catch (error) {
      res.status(500).json({error: error.message})
 
    }
  }

  static async apiUpdateReview(req, res, next){
    try {
      const reviewId = req.body.review_id
      const review = req.body.review

      const date = new Date()

      const ReviewResponse = await ReviewsDAO.updateReview(
        reviewId, req.body.user_id, review, date
      )


      var {error} = ReviewResponse 
      if(error){
        res.status.json('Unable to update error what could be reason?'+{error})
      }


     if(ReviewResponse.modifiedCount === 0){
      throw new Error ("unable to update review. User may not be original poster")
     }

     res.json({status:"Successfuly updated Reviews"})

    } catch (error) {
      res.status(500).json({error: 'Unable to update the review ' +error.message})
 
    }
  }

  static async apiDeleteReview(req, res, next){
    try {
      const reviewId = req.body.review_id
      const userId = req.body.user_id


      const ReviewResponse = await ReviewsDAO.deleteReview(
        reviewId, userId
      )

     res.json({status:"Successfuly deleted Review"})

    } catch (error) {
      res.status(500).json({error: error.message})
 
    }
  }  
}