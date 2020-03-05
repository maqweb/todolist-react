import React, {Component} from 'react';
import './../../App.css';
import TodoList from "./../../TodoList.jsx";
import AddNewItemForm from "./../../components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, getTodolistsTC} from "./../../store/reducer";
import {Redirect} from "react-router-dom";

class Main extends Component {
    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTodolists();
    };

    addTodoList = (newTitle) => {
        this.props.addTodolist(newTitle);
    };

    render() {

        if (!this.props.isAuth) {
            return <Redirect to='/login'/>
        }

        const todoLists = this.props.todolists.map(tl => <TodoList id={tl.id}
                                                                   key={tl.id}
                                                                   title={tl.title}
                                                                   tasks={tl.tasks}/>);
        return (
            <div>
                <div className="mainInput">
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.main.todolists,
        tasks: state.main.todolists.tasks,
        isAuth: state.auth.isAuth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const thunk = addTodolistTC(newTodolist);
            dispatch(thunk)
        },
        getTodolists: () => {
            const thunk = getTodolistsTC();
            dispatch(thunk);
        }
    }
};

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);
export default ConnectedMain;