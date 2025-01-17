import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import TaskModal from './Modal';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
}

const TaskList: React.FC = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Incomplete'>('All');
  const [sortBy, setSortBy] = useState<'Date' | 'Priority'>('Date');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    const savedSortBy = localStorage.getItem('sortBy');
    if (savedSortBy) {
      setSortBy(savedSortBy as 'Date' | 'Priority');
    }
  }, []);

  const saveToLocalStorage = (updatedTasks: Task[], sortBy: 'Date' | 'Priority') => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.setItem('sortBy', sortBy);
  };

  const handleCreateTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks, sortBy);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks, sortBy);
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks, sortBy);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  // Sorting tasks based on selected criteria
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'Date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Latest on top
    }
    const priorityOrder: { [key: string]: number } = {
      'High': 0,
      'Medium': 1,
      'Low': 2,
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1); 
    reorderedTasks.splice(destination.index, 0, movedTask); 

    setTasks(reorderedTasks);
    saveToLocalStorage(reorderedTasks, sortBy);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Task Manager</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6 w-full sm:w-auto justify-center">
        <select
          onChange={(e) => setFilter(e.target.value as 'All' | 'Completed' | 'Incomplete')}
          value={filter}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0 w-full sm:w-auto"
        >
          <option value="All">All Tasks</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
        <select
          onChange={(e) => {
            const newSortBy = e.target.value as 'Date' | 'Priority';
            setSortBy(newSortBy);
            saveToLocalStorage(tasks, newSortBy); 
          }}
          value={sortBy}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="Date">Sort by Date</option>
          <option value="Priority">Sort by Priority</option>
        </select>
      </div>

      
      <button
        onClick={toggleModal}
        className="p-3 bg-blue-500 text-white rounded-md mb-6"
      >
        Add New Task
      </button>

      {/* Drag and Drop Section */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <ul
              className="w-full max-w-4xl space-y-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sortedTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all ${task.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
                        }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex justify-between items-start flex-col sm:flex-row">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                          <p className="text-gray-600 text-sm">{task.description}</p>
                          <p className={`mt-2 text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                            {task.completed ? 'Completed' : 'Incomplete'}
                          </p>
                        </div>
                        <div className="flex space-x-3 mt-4 sm:mt-0">
                          <button
                            onClick={() => navigate(`/task/${task.id}`)}
                            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => toggleComplete(task.id)}
                            className="p-2 bg-yellow-500 text-white rounded-md w-36 hover:bg-yellow-600 transition-all"
                          >
                            Mark {task.completed ? 'Incomplete' : 'Complete'}
                          </button>
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal for Creating New Task */}
      {isModalOpen && (
        <TaskModal
          show={isModalOpen}
          onClose={toggleModal}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
};

export default TaskList;
