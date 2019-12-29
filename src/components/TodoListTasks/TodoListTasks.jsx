import React from "react";
import Task from "./Task/Task";

class TodoListTasks extends React.Component {
    render = () => {
        const tasksElement = this.props.tasks.map(task => {
            return <Task key={task.id}
                         task={task}
                         changeStatus={this.props.changeStatus}
                         changeTitle={this.props.changeTitle}/>
        });

        return (
            <div className="todoList-tasks">
                {tasksElement}
            </div>
        );
    }
}

export default TodoListTasks;
