import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
}

const TaskDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks: Task[] = JSON.parse(savedTasks);
      const currentTask = tasks.find((task) => task.id === Number(id));
      setTask(currentTask || null);
    }
  }, [id]);

  const handleUpdateTask = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (task) {
      const { name, value } = e.target;
      setTask((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSaveChanges = () => {
    if (task) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        const tasks: Task[] = JSON.parse(savedTasks);
        const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      }
    }
    navigate('/');
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    const modal = document.getElementById('update-modal');
    if (modal && !modal.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  if (!task) return <div className="text-center text-lg text-gray-600">Task not found!</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 py-8 px-6 md:px-12">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl sm:max-w-2xl p-8 space-y-8 relative">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-semibold"
          >
            <FaArrowLeft size={20} className="mr-2" />
            Back to Homepage
          </button>

          <button
            onClick={handleUpdateTask}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
          >
            Update Task
          </button>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 w-full break-words">
          {task.title}
        </h2>

        <div className="space-y-6">
          <p className="text-lg text-gray-700">{task.description}</p>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Priority:</span>
            <span
              className={`text-sm font-semibold ${task.priority === 'High'
                  ? 'text-red-600'
                  : task.priority === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
            >
              {task.priority}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Date:</span>
            <span className="text-sm text-gray-500">{new Date(task.date).toLocaleString()}</span>
          </div>

          {/* Task Completion Status */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Status:</span>
            {task.completed ? (
              <div className="flex items-center space-x-1 text-green-600">
                <FaCheckCircle size={20} />
                <span>Completed</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-600">
                <FaTimesCircle size={20} />
                <span>Incomplete</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Editing Task */}
      {isModalOpen && (
        <div
          id="update-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClickOutside}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Task</h2>

            {/* Form Inputs */}
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              placeholder="Task Title"
              className="w-full p-4 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              value={task.description}
              onChange={handleInputChange}
              placeholder="Task Description"
              className="w-full p-4 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="priority"
              value={task.priority}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={handleModalClose}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-md transition duration-200"
              >
                Close
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
