import MoviesDAO from '../dao/moviesDAO.js'

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage)
      : 20
    const page = req.query.page ? parseInt(req.query.page) : 0

    let filter = {}
    if (req.query.rated) {
      filter.rated = req.query.rated
    } else if (req.query.title) {
      filter.title = req.query.title
    }

    const { moviesList, totalNumberoMovies } = await MoviesDAO.getMovies({
      filter,
      page,
      moviesPerPage,
    })

    let response = {
      movies: moviesList,
      page: page,
      filters_response: filter,
      enteries_per_page: moviesPerPage,
      total_results: totalNumberoMovies,
    }
    res.json(response)
  }
}
