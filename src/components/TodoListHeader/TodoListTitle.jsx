import React from 'react';
import '../../App.css'

class TodoListTitle extends React.Component {

    render = () => {
        return (
                <div>
                    <h3 className="todoList-header__title">{this.props.title}</h3>
                    <button onClick={this.props.removeTodolist} className="btn">X</button>
                </div>
        );
    }
}

export default TodoListTitle;
