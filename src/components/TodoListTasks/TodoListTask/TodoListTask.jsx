import React from "react";

class TodoListTask extends React.Component {
    render = (props) => {

        let priorityClass = this.props.priority;
        this.props.priority === 'high' ? priorityClass = "highPriority" :
        this.props.priority === 'medium' ? priorityClass = "mediumPriority" : priorityClass = "lowPriority";

        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.isDone} />
                <span className={priorityClass}> {this.props.title} / priority - {this.props.priority} </span>
            </div>
        )
    }
}

export default TodoListTask;
