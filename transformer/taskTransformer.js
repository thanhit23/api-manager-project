const getTasksList = data => {
  const tasks = data.map(i => {
    const { _id, name, description, createdAt, status, updatedAt, priority, employee, project } = i;

    return {
      _id,
      name,
      description,
      priority,
      status,
      project: {
        _id: project.length ? project[0]._id : '',
        name: project.length ? project[0].name : '',
        date_start: project.length ? project[0].date_start : '',
        team_size: project.length ? project[0].team_size : ''
      },
      employee: {
        _id: employee.length ? employee[0]._id : '',
        name: employee.length ? employee[0].name : '',
        area: employee.length ? employee[0].area : '',
      },
      createdAt,
      updatedAt,
    };
  });
  
  return tasks;
};

const getTaskDetail = data => {
  const { _id, name, description, createdAt, status, updatedAt, priority, user, project } = data[0];

  return {
    _id,
    name,
    description,
    priority,
    status,
    project: {
      _id: project[0]._id,
      name: project[0].name,
      date_start: project[0].date_start,
      team_size: project[0].team_size
    },
    user: {
      _id: user[0]._id,
      username: user[0].username,
      role: user[0].role,
    },
    createdAt,
    updatedAt,
  };
};

export default {
  getTasksList,
  getTaskDetail,
}
