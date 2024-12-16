export const generateTaskData = (numTasks) => {
  const tasks = [];
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    return JSON.parse(storedTasks);
  }

  for (let i = 0; i < numTasks; i++) {
    const task = {
      id: i + 1,
      date: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toLocaleDateString(),
      title: `Задача ${i + 1}`,
      description: `Описание для задачи ${
        i + 1
      }. Это текст, который объясняет, что должно быть сделано в рамках этой задачи.`,
    };

    tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  return tasks;
};
