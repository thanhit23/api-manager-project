import Tasks from '../models/Task.js';
import taskTransformer from '../transformer/taskTransformer.js'

const getList = async(req, res) => {
  const { query: { userId, projectId } } = req
  const match = {}

  if (userId) {
    Object.assign(match, { userId, projectId })
  } else if (projectId) {
    Object.assign(match, { projectId })
  } else if (!userId && !projectId) {
    Object.assign(match, { })
  }

  const data = await Tasks.aggregate([
    {
      $addFields: {
        userId: {
          $toObjectId: "$userId"
        },
        projectId: {
          $toObjectId: "$projectId"
        }
      }
    },
    {
      $lookup: {
        from: "employee",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $lookup: {
        from: "project",
        localField: "projectId",
        foreignField: "_id",
        as: "project"
      }
    },
    { $match : match },
  ])

  return taskTransformer.getTasksList(data);
}

const getDetail = async(req, res) => {
  const { query: { userId, projectId } } = req
  const match = {}

  if (userId) {
    Object.assign(match, { userId, projectId })
  } else if (projectId) {
    Object.assign(match, { projectId })
  } else if (!userId && !projectId) {
    Object.assign(match, { })
  }

  const data = await Tasks.aggregate([
    {
      $addFields: {
        userId: {
          $toObjectId: "$userId"
        },
        projectId: {
          $toObjectId: "$projectId"
        }
      }
    },
    {
      $lookup: {
        from: "employee",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $lookup: {
        from: "project",
        localField: "projectId",
        foreignField: "_id",
        as: "project"
      }
    },
    { $match : match },
  ])

  return taskTransformer.getTaskDetail(data);
}

export default {
  getList,
  getDetail,
}
