// This contains route that people can use to see output etc.

import express from 'express'

import MoviesController from './movies.controller.js'
import ReviewsController from "./reviews.controller.js"


const router = express.Router() // get access to express router.

// router.route('/').get((req, res) => res.send('hello world'))

router.route('/').get(MoviesController.apiGetMovies)

router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .post(ReviewsController.apiUpdateReview)
    .post(ReviewsController.apiDeleteReview)

router.route("/id:id").get(MoviesController.apiGetMovieById)
router.route("/ratings").get(MoviesController.apiGetRatings)

export default router
