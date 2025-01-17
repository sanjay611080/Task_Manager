import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
}

interface TaskModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (newTask: Task) => void;  
}

const TaskModal: React.FC<TaskModalProps> = ({ show, onClose, onCreate }) => {
  const [newTask, setNewTask] = React.useState({
    title: '',
    description: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    date: new Date().toISOString(), 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = () => {
    // Creating a full Task object, including id, completed, and date
    const task: Task = {
      ...newTask,
      id: Date.now(), 
      completed: false, 
    };

    // Passing the full task to the parent component
    onCreate(task); 

    // Reseting the form fields after creation
    setNewTask({ title: '', description: '', priority: 'Medium', date: new Date().toISOString() });
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="p-3 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTask}
            className="p-3 bg-blue-500 text-white rounded-md"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
