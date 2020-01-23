import React from 'react';
import './App.css';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';
import TodoListTitle from "./components/TodoListHeader/TodoListTitle";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskTC,
    changeTodolistTitleAC, getTasksTC,
    removeTaskAC,
    removeTodolistAC,
    updateTaskAC
} from "./store/reducer";
import {api} from "./api/api";

class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [],
        filterValue: "All"
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    restoreState = () => {
        this.props.getTasks(this.props.id);
    };

    addItem = (newTitle) => {
        this.props.addTask(this.props.id, newTitle)
        /*api.addItem(this.props.id, newTitle)
            .then(res => {
                let newTitle = res.data.data.item;
                this.props.addTask(newTitle, this.props.id)
            });*/
    };


    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status})
    };

    changeTitle = (taskId, newTitle, todolistId) => {
        this.changeTask(taskId, {title: newTitle}, todolistId)
    };

    onChangeTodolistTitle = (todolistId, newTitle) => {
        api.changeTodolistTitle(todolistId, newTitle)
            .then(res => {
                this.props.changeTodolistTitle(todolistId, newTitle)
            })
    };

    changeTask = (taskId, obj) => {

        let task = this.props.tasks.find(t => (t.id === taskId));
        let updatedTask = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...obj
        };

        api.changeTask(this.props.id, taskId, updatedTask)
            .then(res => {
                this.props.changeTaskAC(taskId, obj, this.props.id)
            });
    };

    removeTodolist = () => {
        api.removeTodolist(this.props.id)
            .then(res => {
                this.props.removeTodolistAC(this.props.id);
            })
    };

    removeTask = (taskId) => {
        api.removeTask(this.props.id, taskId)
            .then(res => {
                this.props.removeTask(this.props.id, taskId);
            });
    };

    render = () => {

        let {tasks = []} = this.props;

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
                                       removeTodolist={this.removeTodolist}
                                       onChangeTodolistTitle={this.onChangeTodolistTitle}/>

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
        getTasks: (taskId) => {
            const thunk = getTasksTC(taskId);
            dispatch(thunk);
        },
        addTask: (todolistId, newTask) => {
            const thunk = addTaskTC(todolistId, newTask);
            dispatch(thunk);
        },
        changeTaskAC: (taskId, obj, todolistId) => {
            const action = updateTaskAC(taskId, obj, todolistId);
            dispatch(action);
        },
        removeTodolistAC: (todolistId) => {
            const action = removeTodolistAC(todolistId);
            dispatch(action);
        },
        removeTask: (todolistId, taskId) => {
            const action = removeTaskAC(todolistId, taskId);
            dispatch(action);
        },
        changeTodolistTitle: (todolistId, newTitle) => {
            const action = changeTodolistTitleAC(todolistId, newTitle);
            dispatch(action);
        }
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodolist;