import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    };

    render = () => {

        let priorityClass = this.props.task.priority === 'high' ? 'highPriority' :
            this.props.task.priority === 'medium' ? 'mediumPriority' :
                this.props.task.priority === 'low' ? 'lowPriority' : 'noPriority';

        let isDoneClass = this.props.task.isDone === true ? 'done' : '';

        return (
            <div className='todoList-task'>

                <input type='checkbox'
                       checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}/>

                <span className={`${priorityClass} ${isDoneClass}`}> {this.props.task.title} / priority - {this.props.task.priority}</span>
            </div>
        )
    }
}

export default Task;

Task.propTypes = {
    title: PropTypes.string
};