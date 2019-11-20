import React from "react";
import PropTypes from 'prop-types';
import Task from "./Task/Task";

class TodoListTasks extends React.Component {
    render = (props) => {

        const tasksElement = this.props.tasks.map(task => {
            return <Task task={task}
                         title={task.title}
                         isDone={task.isDone}
                         priority={task.priority}
                         changeStatus={this.props.changeStatus}/>
        });

        return (
            <div className="todoList-tasks">
                {tasksElement}
            </div>
        );
    }
}

export default TodoListTasks;

TodoListTasks.propTypes = {
    tasks: PropTypes.array
};