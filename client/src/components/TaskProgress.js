import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskProgress = ({ tasks }) => {
  if (!tasks || tasks.length === 0) return null;

  const completedTasks = tasks.filter(task => task.status === "Completed").length;
  const totalTasks = tasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="mt-3">
      <h6>Task Progress</h6>
      <div className="progress" style={{ height: "25px" }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}% Completed
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;
