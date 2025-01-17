import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  
import TaskItem from '../TaskItem';

describe('TaskItem Component', () => {
  it('should render task title and status', () => {
    const task = { id: 1, title: 'Test Task', completed: false, date: new Date(), priority: 1 };

    render(<TaskItem task={task} />);

    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();

    expect(screen.getByText(/Incomplete/i)).toBeInTheDocument();
  });

  it('should apply correct status styling for incomplete task', () => {
    const task = { id: 2, title: 'Another Test Task', completed: false, date: new Date(), priority: 2 };

    render(<TaskItem task={task} />);

    const statusElement = screen.getByText(/Incomplete/i);
    expect(statusElement).toHaveClass('text-red-500');
  });

  it('should apply correct status styling for completed task', () => {
    const task = { id: 3, title: 'Completed Task', completed: true, date: new Date(), priority: 3 };

    render(<TaskItem task={task} />);

    const completedElements = screen.queryAllByText(/Completed/i);

    const statusElement = completedElements.find(element => 
      element.closest('span')?.classList.contains('text-green-500')
    );

    expect(statusElement).toBeInTheDocument();
    expect(statusElement?.closest('span')).toHaveClass('text-green-500');
  });
});
