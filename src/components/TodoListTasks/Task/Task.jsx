import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {

    state = {
        editMode: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        switch (status) {
            case 2:
                let trueStatus = 2;
                return this.props.changeStatus(this.props.task.id, trueStatus);
            default:
                let falseStatus = 0;
                return this.props.changeStatus(this.props.task.id, falseStatus);
        }
        // this.props.changeStatus(this.props.task.id, status);
    };

    onTitleChanged = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.props.changeTitle(this.props.task.id, this.state.title);
        this.setState({editMode: false})
    };

    onDeleteTask = () => {
        this.props.removeTask(this.props.task.id);
    };

    render = () => {

        let priorityClass = this.props.task.priority === 'high' ? 'highPriority' :
            this.props.task.priority === 'medium' ? 'mediumPriority' :
                this.props.task.priority === 'low' ? 'lowPriority' : 'noPriority';

        let isDoneClass = this.props.task.status === 2 ? 'done' : '';

        return (
            <div className='todoList-task'>

                <input type='checkbox'
                       checked={this.props.task.status === 2}
                       onChange={this.onIsDoneChanged}/>

                {this.state.editMode ?
                    <input onBlur={this.deactivateEditMode}
                           autoFocus={true}
                           onChange={this.onTitleChanged}
                           value={this.state.title} type="text"/>

                    : <span onClick={this.activateEditMode}
                            className={`${priorityClass} ${isDoneClass}`}> {this.state.title}</span>}
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