import React from "react";
import PropTypes from 'prop-types';

class Task extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    };

    render = (props) => {

        let priorityClass = this.props.priority;
        this.props.priority === 'high' ? priorityClass = "highPriority" :
            this.props.priority === 'medium' ? priorityClass = "mediumPriority" :
                this.props.priority === 'low' ?  priorityClass = "lowPriority" : priorityClass = "noPriority";

        return (
            <div className="todoList-task">

                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}/>

                <span className={priorityClass}> {this.props.title} / priority - {this.props.priority} </span>
            </div>
        )
    }
}

export default Task;

Task.propTypes = {
    title: PropTypes.string

};