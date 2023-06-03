const getTasksList = data => {
  const tasks = data.map(i => {
    console.log(i,'iiiii');
    const { _id, name, description, createdAt, updatedAt, priority, user, project } = i;
    return {
      _id,
      name,
      description,
      priority,
      project: {
        _id: project[0].id,
        name: project[0].name,
        date_start: project[0].date_start,
        team_size: project[0].team_size
      },
      user: {
        _id: user[0].id,
        username: user[0].username,
        role: user[0].role,
      },
      createdAt,
      updatedAt,
    };
  });
  
  return tasks;
};

export default {
  getTasksList,
}
