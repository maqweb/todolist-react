import React from 'react';
import PropTypes from 'prop-types';
import delIcon from "../../../assets/trash.svg";

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
        this.props.onRemoveTask(this.props.task.id);
    };

    render = () => {

        // let priorityClass = this.props.task.priority === 'high' ? 'highPriority' :
        //     this.props.task.priority === 'medium' ? 'mediumPriority' :
        //         this.props.task.priority === 'low' ? 'lowPriority' : 'noPriority';

        let isDoneClass = this.props.task.status === 2 ? 'done' : '';

        let priorityTitle = '';
        switch (this.props.task.priority) {
            case 0:
                priorityTitle = "Low";
                break;
            case 1:
                priorityTitle = "Middle";
                break;
            case 2:
                priorityTitle = "High";
                break;
            case 3:
                priorityTitle = "Urgently";
                break;
            case 4:
                priorityTitle = "Later";
                break;
            default:
                priorityTitle = '';
        }

        return (
            <div className='todoList-task'>
                <div>
                    <input type='checkbox'
                           checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}/>

                    {this.state.editMode ?
                        <input onBlur={this.deactivateEditMode}
                               autoFocus={true}
                               onChange={this.onTitleChanged}
                               value={this.state.title} type="text"/>

                        : <span onClick={this.activateEditMode}
                                className={isDoneClass}> {this.state.title}</span>}
                    <span> - priority: {priorityTitle}</span>
                </div>
                <button className="btn-task" onClick={this.onDeleteTask}>
                    <img className='del-icon' src={delIcon} alt=""/>
                </button>
            </div>
        )
    }
}

export default Task;

Task.propTypes = {
    title: PropTypes.string
};