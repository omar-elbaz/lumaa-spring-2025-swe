import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api/tasks";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks(token as string);
    setTasks(response.data);
  };

  const handleCreateTask = async () => {
    await createTask(token as string, title, description);
    fetchTasks();
  };

  const handleUpdateTask = async (
    id: number,
    title: string,
    description: string,
    isComplete: boolean
  ) => {
    await updateTask(token as string, id, title, description, !isComplete);
    fetchTasks();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(token as string, id);
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.isComplete ? "✅" : "❌"}
            <button
              onClick={() =>
                handleUpdateTask(
                  task.id,
                  task.title,
                  task.description,
                  task.isComplete
                )
              }
            >
              Toggle Complete
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
