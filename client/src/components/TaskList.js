import React from "react";
import ProgressBar from "./TaskProgress";
import ShareTask from "./ShareTask";
import { FaEdit, FaTrash } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const getCardBorder = (status) => {
  switch (status) {
    case "Completed": return "success";
    case "In Progress": return "warning";
    default: return "secondary";
  }
};

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className="container bg-light p-4 rounded">
      <ProgressBar tasks={tasks} />

      <div className="row mt-4">
        {tasks.length === 0 ? (
          <p className="text-muted">No tasks available. Add one!</p>
        ) : (
          tasks.map((task) => (
            <div className="col-md-6 mb-3" key={task._id}>
              <div className={`card h-100 shadow-sm border-${getCardBorder(task.status)}`}>
                <div className="card-body">
                  <h5 className="card-title">{task.title || "Untitled Task"}</h5>
                  <p className="card-text">{task.description || "No description provided."}</p>
                  <p className="card-text">
                    <strong>Status:</strong> {task.status || "Pending"}
                  </p>
                  <p className="card-text">
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {/* 💌 Share Task */}
                  <ShareTask taskId={task._id} />
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEditTask(task)}
                  >
                    <FaEdit className="me-1" /> Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDeleteTask(task._id)}
                  >
                    <FaTrash className="me-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
