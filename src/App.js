import React from 'react';
import './App.css';
import TodoList from "./TodoList.jsx";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, getTodolistsTC} from "./store/reducer";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTodolists();
    };

    addTodoList = (newTitle) => {
        this.props.addTodolist(newTitle);
    };

    render = () => {
        const todoLists = this.props.todolists.map(tl => <TodoList id={tl.id}
                                                                   key={tl.id}
                                                                   title={tl.title}
                                                                   tasks={tl.tasks}/>);
        return (
            <>
                <div className="mainInput">
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
        tasks: state.todolists.tasks
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

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
