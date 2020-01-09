import React from 'react';
import './App.css';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';
import TodoListTitle from "./components/TodoListHeader/TodoListTitle";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, removeTaskAC, removeTodolistAC, updateTaskAC} from "./store/reducer";

class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [],
        filterValue: "All"
    };

    saveState = () => {
        //переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем стэйт в localStorage под ключом 'our-state'
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state-' + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };

    addItem = (newTitle) => {
        let newTask = {
            id: this.props.tasks.length + 1,
            title: newTitle,
            isDone: false,
            priority: 'no'

        };
        // let newTasks = [...this.state.tasks, newTask];
        // this.setState({tasks: newTasks}, () => {this.saveState()});
        this.props.addTask(newTask, this.props.id);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState()
        })
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (taskId, newTitle, todolistId) => {
        this.changeTask(taskId, {title: newTitle}, todolistId)
    };

    changeTask = (taskId, obj) => {
        this.props.changeTaskAC(taskId, obj, this.props.id)
    };

    removeTodolist = () => {
        this.props.removeTodolistAC(this.props.id)
    };

    removeTask = (taskId) => {
        this.props.removeTask(this.props.id, taskId);
    };

    render = () => {

        let {tasks = {}} = this.props;

        const getFilterTasks = (tasks) => {
            return tasks.filter(t => {
                        if (this.props.filterValue === 'Active') {
                            return t.isDone === false;
                        } else if (this.props.filterValue === 'Completed') {
                            return t.isDone === true;
                        } else {
                            return true;
                        }
                    }
            )
        };

        return (
                <div className="App">
                    <div className="todoList">

                        <div className="todoList-header">
                            <TodoListTitle id={this.props.id}
                                           title={this.props.title}
                                           removeTodolist={this.removeTodolist}/>

                            <AddNewItemForm addItem={this.addItem}/>
                        </div>

                        <TodoListTasks tasks={getFilterTasks(tasks)}
                                       changeStatus={this.changeStatus}
                                       changeTitle={this.changeTitle}
                                       removeTask={this.removeTask}/>

                        <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>

                    </div>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todolistId) => {
            const action = addTaskAC(newTask, todolistId);
            dispatch(action)
        },
        changeTaskAC: (taskId, obj, todolistId) => {
            const action = updateTaskAC(taskId, obj, todolistId);
            dispatch(action)
        },
        removeTodolistAC: (todolistId) => {
            const action = removeTodolistAC(todolistId);
            dispatch(action);
        },
        removeTask : (todolistId, taskId) => {
            const action = removeTaskAC(todolistId, taskId);
            dispatch(action)
        }
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodolist;