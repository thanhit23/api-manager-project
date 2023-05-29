import Employee from '../models/Employee.js';
import response from '../helpers/response.js';
import { filterByKeys } from '../utils/filterObject.js';

const employeeController = {
  create: async({ body }, res) => {
    try {
      const data = filterByKeys(body, ['name', 'status', 'area']);

      const newEmployee = await new Employee(data)

      const employee = await newEmployee.save();

      return response.success(res, employee)
    } catch (error) {
      return response.serverError(res, error);
    }
  },

  detail: async (req, res) => {
    try {
      const { params: { id } } = req;

      const employee = await Employee.findById(id)

      if (!employee) return response.error(res, 'Not Found', 404);

      return response.success(res, employee);
    } catch (error) {
      return response.serverError(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { params: { id } } = req;

      const employee = await Employee.findById(id)

      if (!employee) return response.error(res, 'Not Found', 404);

      await Employee.findByIdAndDelete(id)

      return response.success(res, true, 'Delete Success');
    } catch (error) {
      return response.serverError(res, error);
    }
  },

  update: async ({ params: { id }, body }, res) => {
    try {
      const employee = await Employee.findById(id)

      if (!employee) return response.error(res, 'Not Found', 404);

      const data = filterByKeys(body, ['name', 'status', 'area']);

      const result = await Employee.findByIdAndUpdate(id, data)

      return response.success(res, result);
    } catch (error) {
      return response.serverError(res, error);
    }
  },

  getList: async(req, res) => {
    try {
      const { query: { page = 1 } } = req;

      const total = await Employee.find().count();

      const books = await Employee.find()
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

  getListEmployees: async(req, res) => {
    try {
      const { query: { bookId, parentId } } = req
      const match = {}

      if (bookId) {
        Object.assign(match, { bookId, parentId: null })
      } else if (parentId) {
        Object.assign(match, { parentId })
      } else if (!bookId && !parentId) {
        Object.assign(match, { })
      }

      const listEmployees = await Employee.aggregate([
        {
          $addFields: {
            userId: {
              $toObjectId: "$userId"
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
          }
        },
        { $match : match },
      ])
      const employeeIds = listEmployees.map(({_id}) => _id);
      const data = await Employee.aggregate([
        {
          $addFields: {
            parentId: {
              $toObjectId: "$parentId"
            }
          }
        },
        {$match: { parentId: { $in: employeeIds } } },
        {$group: {_id: "$parentId", totalReply:{$sum:1}}},
      ])

      const result = listEmployees.map( item => {
        const { totalReply = 0 } = data.find( e => e._id.toString() == item._id.toString()) || {}

        return { ...item, totalReply }
      })

      return response.success(res, result)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
}

export default employeeController;
