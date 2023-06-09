import Tasks from '../models/Task.js';
import taskTransformer from '../transformer/taskTransformer.js'

const getList = async(req, res) => {
  const { query: { employeeId, projectId } } = req
  const match = {}

  if (employeeId) {
    Object.assign(match, { userId, projectId })
  } else if (projectId) {
    Object.assign(match, { projectId })
  } else if (!employeeId && !projectId) {
    Object.assign(match, { })
  }

  const data = await Tasks.aggregate([
    {
      $addFields: {
        employeeId: {
          $toObjectId: "$employeeId"
        },
        projectId: {
          $toObjectId: "$projectId"
        }
      }
    },
    {
      $lookup: {
        from: "employee",
        localField: "employeeId",
        foreignField: "_id",
        as: "employee"
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
  const { query: { employeeId, projectId } } = req
  const match = {}

  if (employeeId) {
    Object.assign(match, { employeeId, projectId })
  } else if (projectId) {
    Object.assign(match, { projectId })
  } else if (!employeeId && !projectId) {
    Object.assign(match, { })
  }

  const data = await Tasks.aggregate([
    {
      $addFields: {
        employeeId: {
          $toObjectId: "$employeeId"
        },
        projectId: {
          $toObjectId: "$projectId"
        }
      }
    },
    {
      $lookup: {
        from: "employee",
        localField: "employeeId",
        foreignField: "_id",
        as: "employee"
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
