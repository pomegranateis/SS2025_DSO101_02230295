import { useState, useEffect, useRef } from "react";
import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

function App() {
  const [tasks, setTasks] = useState([]);
  const [desc, setDesc] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState({});
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!desc.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/tasks", { description: desc });
      setTasks((t) => [...t, res.data]);
      setDesc("");
      inputRef.current?.focus();
    } catch {
      setError("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    const old = tasks;
    setTasks((t) => t.filter((x) => x.id !== id));
    setItemLoading((m) => ({ ...m, [id]: true }));
    setError("");
    try {
      await api.delete(`/tasks/${id}`);
    } catch {
      setError("Delete failed, restoring task.");
      setTasks(old);
    } finally {
      setItemLoading((m) => ({ ...m, [id]: false }));
    }
  };

  const updateTask = async (task) => {
    const old = tasks;
    setTasks((t) => t.map((x) => (x.id === task.id ? task : x)));
    setItemLoading((m) => ({ ...m, [task.id]: true }));
    setError("");
    setEditingId(null);
    try {
      await api.put(`/tasks/${task.id}`, task);
    } catch {
      setError("Update failed, restoring task.");
      setTasks(old);
    } finally {
      setItemLoading((m) => ({ ...m, [task.id]: false }));
    }
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h2>To-Do List</h2>
      {error && (
        <div
          style={{ background: "#d9534f", color: "#fff", padding: "0.5rem" }}
        >
          {error}
        </div>
      )}

      <div style={{ margin: "1rem 0" }}>
        <input
          ref={inputRef}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="New task..."
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          style={{ width: "70%" }}
        />
        <button
          onClick={addTask}
          disabled={loading || !desc.trim()}
          style={{ marginLeft: "0.5rem" }}
        >
          {loading ? "Adding…" : "Add"}
        </button>
      </div>

      {loading && tasks.length === 0 ? (
        <p>Loading tasks…</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => {
            const busy = !!itemLoading[task.id];
            const isEditing = editingId === task.id;
            return (
              <li
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  opacity: busy ? 0.5 : 1,
                  margin: "0.75rem 0",
                }}
              >
                {isEditing ? (
                  <>
                    <input
                      value={task.description}
                      onChange={(e) =>
                        setTasks((ts) =>
                          ts.map((t) =>
                            t.id === task.id
                              ? { ...t, description: e.target.value }
                              : t
                          )
                        )
                      }
                      style={{ flex: 1 }}
                    />
                    <button
                      onClick={() => updateTask(task)}
                      disabled={busy}
                      style={{ margin: "0 0.5rem" }}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} disabled={busy}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={task.is_complete}
                      onChange={() =>
                        updateTask({ ...task, is_complete: !task.is_complete })
                      }
                      disabled={busy}
                    />
                    <span
                      onClick={() =>
                        updateTask({ ...task, is_complete: !task.is_complete })
                      }
                      style={{
                        flex: 1,
                        marginLeft: "0.5rem",
                        textDecoration: task.is_complete
                          ? "line-through"
                          : "none",
                        color: task.is_complete ? "#777" : "#000",
                        cursor: "pointer",
                      }}
                    >
                      {task.description}
                    </span>
                    <button
                      onClick={() => setEditingId(task.id)}
                      disabled={busy}
                      style={{ margin: "0 0.5rem" }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task.id)} disabled={busy}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
