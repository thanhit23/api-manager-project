import Books from '../models/Book.js';
import Comment from '../models/Comment.js';
import response from '../helpers/response.js';

const booksController = {
  create: async(req, res) => {
    try {
      const { body: { name, price, discount, images, description } }  = req;

      const newBooks = await new Books({
        name,
        price,
        images,
        discount,
        description,
      })
      const books = await newBooks.save();

      return response.success(res, books);
    } catch (error) {
      response.serverError(res, error)
    }
  },
  delete: async(req, res) => {
    try {
      const book = await Books.findById(req.params.id)

      if (!book) {
        return response.error(res, 'Not Found', 404)
      }

      const comment = await Comment.find({ bookId: book.id })
      if (comment) {
        return response.error(res, 'Delete Failed', 400)
      }
      return response.success(res, result, 'Delete books successfully');
    } catch (error) {
      response.serverError(res, error)
    }
  },
  update: async(req, res) => {
    const book = await Books.findByIdAndUpdate(req.params.id, req.body)
    const message = book ? 'Update books successfully': 'Update books failed';
    return response.success(res, Boolean(book), message);
  },
  getList: async(req, res) => {
    const books = await Books.find()
    
    return response.success(res, books);
  },
  detail: async(req, res) => {
    const book = await Books.findById(req.params.id)
    return response.success(res, book);
  }
}

export default booksController;
