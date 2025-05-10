import React, { useEffect, useState } from "react";
import api from '../services/api'; 

const SharedTasks = () => {
  const [sharedTasks, setSharedTasks] = useState([]);

  useEffect(() => {
    const fetchSharedTasks = async () => {
      try {
        const response = await api.get("/tasks/shared");
        setSharedTasks(response.data);
      } catch (error) {
        console.error("Error fetching shared tasks:", error);
      }
    };

    fetchSharedTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h4 className="mb-3">📬 Tasks Shared With You</h4>
      {sharedTasks.length === 0 ? (
        <p className="text-muted">No tasks shared with you yet.</p>
      ) : (
        <div className="row">
          {sharedTasks.map((task) => (
            <div className="col-md-6 mb-3" key={task._id}>
              <div className="card shadow-sm border-info">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <p className="card-text">
                    <strong>Status:</strong> {task.status || "Pending"}
                  </p>
                  <p className="card-text">
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="card-text">
                    <strong>Shared By:</strong> {task.owner?.email || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedTasks;
