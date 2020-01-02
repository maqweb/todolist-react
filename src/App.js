import React from 'react';
import './App.css';
import TodoList from "./TodoList.jsx";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTolistAC} from "./store/reducer";

class App extends React.Component {

    addTodoList = (newTitle) => {

        let newTodoList = {
            id: this.props.todolists.length + 1,
            title: newTitle,
            tasks: []
        };
        this.props.addTodolist(newTodoList);
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
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const action = addTolistAC(newTodolist);
            dispatch(action)
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
