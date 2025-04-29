import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/tasks`)
      .then((res) => setTasks(res.data))
      .catch(console.error);
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    const { data } = await axios.post(`${API}/tasks`, { title });
    setTasks((prev) => [...prev, data]);
    setTitle("");
  };

  const toggle = async (t) => {
    const { data } = await axios.put(`${API}/tasks/${t.id}`, {
      title: t.title,
      completed: !t.completed,
    });
    setTasks((prev) => prev.map((x) => (x.id === data.id ? data : x)));
  };

  const remove = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    setTasks((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>To-Do List</h1>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li key={t.id} style={{ margin: "8px 0" }}>
            <span
              onClick={() => toggle(t)}
              style={{
                cursor: "pointer",
                textDecoration: t.completed ? "line-through" : "none",
                marginRight: 8,
              }}
            >
              {t.title}
            </span>
            <button onClick={() => remove(t.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
