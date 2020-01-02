import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {

    state = {
        editMode: false
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    };

    onDeleteTask = () => {
        this.props.removeTask(this.props.task.id);
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

                    {this.state.editMode ?
                            <input onBlur={this.deactivateEditMode}
                                   autoFocus={true}
                                   onChange={this.onTitleChanged}
                                   value={this.props.task.title} type="text"/>

                            : <span onClick={this.activateEditMode}
                                    className={`${priorityClass} ${isDoneClass}`}>{this.props.task.id} - {this.props.task.title}</span>}
                    <span> - priority: {this.props.task.priority}</span>

                    <button className="btn-tasks" onClick={this.onDeleteTask}>X</button>
                </div>
        )
    }
}

export default Task;

Task.propTypes = {
    title: PropTypes.string
};