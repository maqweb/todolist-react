import React from 'react';
import './App.css';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';
import TodoListTitle from "./components/TodoListHeader/TodoListTitle";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskTC,
    changeTodolistTitleTC,
    getTasksTC,
    removeTaskTC,
    removeTodolistTC,
    updateTaskTC
} from "./store/reducer";

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
    };

    changeStatus = (taskId, status) => {
        this.onChangeTask(taskId, {status: status})
    };

    changeTitle = (taskId, newTitle, todolistId) => {
        this.onChangeTask(taskId, {title: newTitle}, todolistId)
    };

    onChangeTodolistTitle = (todolistId, newTitle) => {
        this.props.changeTodolistTitle(todolistId, newTitle);
    };

    onChangeTask = (taskId, obj) => {

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

        this.props.changeTask(this.props.id, taskId, updatedTask)
    };

    onRemoveTodolist = () => {
        this.props.removeTodolist(this.props.id);
    };

    onRemoveTask = (taskId) => {
        this.props.removeTask(this.props.id, taskId)
    };

    render = () => {

        let {tasks = []} = this.props;

        const getFilterTasks = (tasks) => {
            return tasks.filter(t => {
                    if (this.state.filterValue === 'Active') {
                        return t.status === 0;
                    } else if (this.state.filterValue === 'Completed') {
                        return t.status === 2;
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
                                       onRemoveTodolist={this.onRemoveTodolist}
                                       onChangeTodolistTitle={this.onChangeTodolistTitle}/>

                        <AddNewItemForm addItem={this.addItem}/>
                    </div>

                    <TodoListTasks tasks={getFilterTasks(tasks)}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   onRemoveTask={this.onRemoveTask}/>

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
        changeTask: (todolistId, taskId, obj) => {
            const thunk = updateTaskTC(todolistId, taskId, obj);
            dispatch(thunk);
        },
        removeTodolist: (todolistId) => {
            const thunk = removeTodolistTC(todolistId);
            dispatch(thunk);
        },
        removeTask: (todolistId, taskId) => {
            const thunk = removeTaskTC(todolistId, taskId);
            dispatch(thunk);
        },
        changeTodolistTitle: (todolistId, newTitle) => {
            const thunk = changeTodolistTitleTC(todolistId, newTitle);
            dispatch(thunk);
        }
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodolist;