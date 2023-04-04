import Comment from '../models/Comment.js';
import response from '../helpers/response.js';

const commentController = {
  create: async(req, res) => {
    try {
      const { body: { bookId, content, userId, parentId = null } } = req;
      const newComment = await new Comment({
        content,
        parentId,
        bookId,
        userId,
      })
      const comment = await newComment.save();

      return response.success(res, comment)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const { params: { id } } = req;
      const comment = await Comment.findById(id)
      // if (userId == comment._id || admin) {
      //   const result = await Comment.findByIdAndDelete(req.params.id)
      //   return response.success(res, result);
      // }
      if (!comment) {
        return response.error(res, 'Not Found', 404);
      }
      const result = await Comment.findByIdAndDelete(id)

      return response.success(res, result);
      // return response.error(res, 'Unauthorized', 401);
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { user: { user: { _id : userId, admin } } } = req;
      const comment = await Comment.findById(req.params.id)
      if (userId == comment._id || admin) {
        const result = await Comment.findByIdAndUpdate(req.params.id, req.body)
        return response.success(res, result);
      }

      return response.error(res, 'Unauthorized', 401);
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  getListComments: async(req, res) => {
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

export default commentController;
