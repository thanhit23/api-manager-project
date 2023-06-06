import Tasks from '../models/Task.js';
import response from '../helpers/response.js';
import { filterByKeys } from '../utils/filterObject.js';
import taskService from '../services/task.service.js';

const taskController = {
  create: async({ body }, res) => {
    try {
      const data = filterByKeys(body, ['name', 'description', 'projectId', 'userId', 'priority', 'status']);

      const newTasks = await new Tasks(data)

      await newTasks.save();

      return response.success(res, true);
    } catch (error) {
      response.serverError(res, error)
    }
  },
  delete: async(req, res) => {
    try {
      const task = await Tasks.findById(req.params.id)
      if (!task) return response.error(res, 'Not Found', 404);

      const tasks = await Tasks.find({ taskId: task.id });

      if (!tasks) return response.error(res, 'Delete Failed', 400);

      await Tasks.findByIdAndDelete(req.params.id);

      return response.success(res, true, 'Delete tasks successfully');
    } catch (error) {
      response.serverError(res, error)
    }
  },
  update: async(req, res) => {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body)
    const message = task ? 'Update tasks successfully': 'Update tasks failed';
    return response.success(res, Boolean(task), message);
  },
  getList: async(req, res) => {
    const listTasks = await taskService.getList(req)

    return response.success(res, listTasks);
  },
  getListByName: async(req, res) => {
    const { params: { keyword } } = req;

    const tasks = await Tasks.find({ name: { $regex: ".*" + keyword +  ".*", $options: 'i'}})
    .limit(10)
    
    return response.success(res, tasks);
  },
  detail: async(req, res) => {
    const task = await taskService.getDetail(req);

    return response.success(res, task);
  }
}

export default taskController;
