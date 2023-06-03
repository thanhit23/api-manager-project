import Project from '../models/Project.js';
import response from '../helpers/response.js';
import { filterByKeys } from '../utils/filterObject.js';

const projectController = {
  create: async({ body }, res) => {
    try {
      const data = filterByKeys(body, ['name', 'date_start', 'team_size']);

      const newProject = await new Project(data);

      const project = await newProject.save();

      return response.success(res, project)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  delete: async ({ params: { id } }, res) => {
    try {
      const comment = await Project.findById(id)
      
      if (!comment) return response.error(res, 'Not Found', 404);

      const result = await Project.findByIdAndDelete(id)

      return response.success(res, result);
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const comment = await Project.findById(req.params.id)
      if (!comment) {
        return response.error(res, 'Not Found', 404);
      }

      const result = await Project.findByIdAndUpdate(req.params.id, req.body)
      return response.success(res, result);
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  getListProjects: async(req, res) => {
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

      const listComments = await Comment.aggregate([
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
      const commentIds = listComments.map(({_id}) => _id);
      const data = await Comment.aggregate([
        {
          $addFields: {
            parentId: {
              $toObjectId: "$parentId"
            }
          }
        },
        {$match: { parentId: { $in: commentIds } } },
        {$group: {_id: "$parentId", totalReply:{$sum:1}}},
      ])

      const result = listComments.map( item => {
        const { totalReply = 0 } = data.find( e => e._id.toString() == item._id.toString()) || {}

        return { ...item, totalReply }
      })

      return response.success(res, result)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
}

export default projectController;
