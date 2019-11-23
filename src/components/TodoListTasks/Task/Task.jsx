import React from "react";
import PropTypes from 'prop-types';

class Task extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    };

    render = () => {

        let priorityClass = this.props.task.priority;
        this.props.task.priority === 'high' ? priorityClass = "highPriority" :
            this.props.task.priority === 'medium' ? priorityClass = "mediumPriority" :
                this.props.task.priority === 'low' ?  priorityClass = "lowPriority" : priorityClass = "noPriority";

        return (
            <div className="todoList-task">

                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}/>

                <span className={priorityClass}> {this.props.task.title} / priority - {this.props.task.priority} </span>
            </div>
        )
    }
}

export default Task;

Task.propTypes = {
    title: PropTypes.string

};