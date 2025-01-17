import React from 'react';
import PropTypes from 'prop-types';

// Type for the task prop
interface TaskItemProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
    date: Date;
    priority: number;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="flex justify-between items-center">
      <span>{task.title}</span>
      <span className={`text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
        {task.completed ? 'Completed' : 'Incomplete'}
      </span>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
};

export default TaskItem;
