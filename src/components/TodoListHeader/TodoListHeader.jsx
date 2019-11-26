import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css'

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: ''
    };

    onAddTaskClick = () => {
        let newText = this.state.title;
        this.setState({title: ''});
        if (newText.trim() === '') {
            this.setState({
                error: true
            })
        } else {
            this.props.addTask(newText);
            this.setState({
                error: false
            })
        }
    };

    onInputChange = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddTaskClick();
            this.setState({
                title: ''
            })
        }
    };

    render = (props) => {

        let errorClass = this.state.error === true ? 'error' : '';

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">

                    <input type="text"
                           onChange={this.onInputChange}
                           onKeyPress={this.keyPress}
                           className={errorClass}
                           value={this.state.title}
                           placeholder="New task name"/>

                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

TodoListHeader.propTypes = {
    onAddTaskClick: PropTypes.func
};
