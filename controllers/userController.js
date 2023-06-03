import User from "../models/User.js";
import response from "../helpers/response.js";
import { filterByKeys } from '../utils/filterObject.js';

const userController = {
  create: async({ body }, res) => {
    try {
      const data = filterByKeys(body, ['username', 'account', 'password', 'role']);

      const newUser = await new User(data)

      const user = await newUser.save();

      return response.success(res, user)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  getAllUsers: async(req, res) => {
    try {
      const { query: { page = 1 } } = req;

      const total = await User.find().count();

      const books = await User.find()
      .skip( +page > 1 ? 10 : 0 )
      .limit(10)
      
      return response.success(res, {
        data: books,
        meta: {
          current_page: +page,
          limit: 10,
          total_page: Math.ceil(total/10),
        }
      });
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  delete: async(req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      console.log(user, 'useeeeeee');
      return response.success(res, user)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  getMe: async(req, res) => {
    try {
      return response.success(res, req.user.user)
    } catch (error) {
      return response.serverError(res, error);
    }
  }
}

export default userController;
