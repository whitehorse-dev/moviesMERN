let movies

// movies stores the reference to database.

// we careated export class MoviesDAO and used method injectDB if movies already present --> Return else connect db and take out movies.
export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return
    }
    try {
      movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies')
    } catch (e) {
      console.error('unable to connect in MoviesDAO: ${e}')
    }
  }

  static async getMovies({
    // default filter
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters['title'] } }
      } else if ("rated" in filters) {
        query = { "rated": { $eq: filters['rated'] } }
      }
    }

    let cursor
    // We use cursor because there can be large amound of data and cursor fetches the data in batches so that not much memory is used.

    try {
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page)

      const moviesList = await cursor.toArray()
      const totalNumberoMovies = await movies.countDocuments(query)
      return { moviesList, totalNumberoMovies }
    } catch (error) {
      console.log('Unable to issue find command, ${e}')
      return { moviesList: [], totalNumberoMovies: 0 }
    }
  }
}
