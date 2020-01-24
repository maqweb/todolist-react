import React from 'react';
import '../../App.css'
import delIcon from './../../assets/trash.svg'

class TodoListTitle extends React.Component {

    state = {
        editMode: false,
        title: this.props.title
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.onChangeTodolistTitle(this.props.id, this.state.title)
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };

    render = () => {
        return (
                <div className="todolist-title">
                    {this.state.editMode
                        ? <input value={this.state.title}
                                 className='editTitleInput'
                                 onBlur={this.deactivateEditMode}
                                 onChange={this.onTitleChanged}
                                 autoFocus={true} type="text"/>
                        : <h3 className="todoList-header__title"
                              onClick={this.activateEditMode}>{this.state.title}</h3>}

                    <button onClick={this.props.onRemoveTodolist} className="btn btn-title">
                        <img className='del-icon' src={delIcon} alt=""/>
                    </button>
                </div>
        );
    }
}

export default TodoListTitle;
