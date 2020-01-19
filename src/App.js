import React from 'react';
import './App.css';
import TodoList from "./TodoList.jsx";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTolistAC, setTodolistAc} from "./store/reducer";
import {api} from "./api/api";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        api.getTodolists()
            .then(res => {
            this.props.setTodolist(res.data)
        });

    };

    addTodoList = (newTitle) => {
        api.addTodoList(newTitle)
            .then(res => {
                let newTodolist = res.data.data.item;
                this.props.addTodolist(newTodolist)
            });
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
            const action = addTolistAC(newTodolist);
            dispatch(action)
        },
        setTodolist: (resTodolist) => {
            const action = setTodolistAc(resTodolist);
            dispatch(action)
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
