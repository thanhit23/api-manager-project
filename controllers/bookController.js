import Books from '../models/Book.js';
import response from '../helpers/response.js';

const postsController = {
  create: async(req, res) => {
    try {
      const { body: { name, price, discount, images } }  = req;

      const newPosts = await new Books({
        name,
        price,
        images,
        discount,
      })
      const books = await newPosts.save();

      return response.success(res, books);
    } catch (error) {
      response.serverError(res, error)
    }
  },
  delete: async(req, res) => {
    try {
      const post = await Books.findById(req.params.id)

      if (!post) {
        return response.error(res, 'Not Found', 404)
      }

      const result = await Books.findByIdAndDelete(req.params.id);
      return response.success(res, result, 'Delete posts successfully');
    } catch (error) {
      response.serverError(res, error)
    }
  },
  update: async(req, res) => {
    const post = await Books.findByIdAndUpdate(req.params.id, req.body)
    const message = post ? 'Update posts successfully': 'Update posts failed';
    return response.success(res, Boolean(post), message);
  },
  getList: async(req, res) => {
    const books = await Books.find()
    
    return response.success(res, books);
  },
  detail: async(req, res) => {
    const post = await Books.findById(req.params.id)
    return response.success(res, post);
  }
}

export default postsController;
