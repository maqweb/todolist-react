import React from 'react';
import './App.css';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';
import TodoListTitle from "./components/TodoListHeader/TodoListTitle";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, removeTaskAC, removeTodolistAC, setTaskAC, updateTaskAC} from "./store/reducer";
import axios from "axios";

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
        }, () => {
            this.saveState()
        })
    };

    // saveState = () => {
    //     //переводим объект в строку
    //     let stateAsString = JSON.stringify(this.state);
    //     // сохраняем стэйт в localStorage под ключом 'our-state'
    //     localStorage.setItem('our-state-' + this.props.id, stateAsString)
    // };

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
            }
        )
            .then(res => {
                let allTasks = res.data.items;
                this.props.setTasks(allTasks, this.props.id);
        })
    };

    addItem = (newTitle) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newTitle},
            {
                withCredentials: true,
                headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
            }
        )
            .then(res => {
                let newTitle = res.data.data.item;
                this.props.addTask(newTitle, this.props.id)
            });
    };


    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status})
    };

    changeTitle = (taskId, newTitle, todolistId) => {
        this.changeTask(taskId, {title: newTitle}, todolistId)
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

        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            updatedTask,
            {
                withCredentials: true,
                headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
            }
        )
            .then(res => {
                let status = res.data.data.item.status;
                console.log(status);
                this.props.changeTaskAC(taskId, obj, this.props.id)
            });
    };

    removeTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
            })
            .then(res => {
                this.props.removeTodolistAC(this.props.id);
            })
    };

    removeTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'}
            })
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
        setTasks: (tasks, todolistId) => {
            const action = setTaskAC(tasks, todolistId);
            dispatch(action)
        },
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