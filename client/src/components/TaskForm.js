import React, { useState, useEffect } from "react";

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, cancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : "");
      setStatus(editingTask.status || "Pending");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) return;

    const taskData = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      status
    };

    if (editingTask) {
      onUpdateTask(editingTask._id, taskData);
    } else {
      onAddTask(taskData);
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Pending");
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label"><strong>Title</strong></label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>
      <div className="mb-3">
        <label className="form-label"><strong>Description</strong></label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows="3"
        />
      </div>
      <div className="mb-3">
        <label className="form-label"><strong>Due Date</strong></label>
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label"><strong>Status</strong></label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
