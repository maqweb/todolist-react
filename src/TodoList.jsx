import React from 'react';
import './App.css';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';
import TodoListTitle from "./components/TodoListHeader/TodoListTitle";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";

class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [
            // {id: 1, title: 'HTML', isDone: true, priority: 'low'},
            // {id: 2, title: 'CSS', isDone: true, priority: 'low'},
            // {id: 3, title: 'JS', isDone: true, priority: 'medium'},
            // {id: 4, title: 'React', isDone: false, priority: 'high'},
            // {id: 5, title: 'Redux', isDone: false, priority: 'high'}
        ],
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

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return {...t, ...obj}
            } else {
                return t
            }
        });
        this.setState({
            tasks: newTasks
        }, () => {
            this.saveState()
        })
    };

    render = () => {

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
                            <TodoListTitle title={this.props.title} removeTodolist={this.props.removeTodolist}/>
                            <AddNewItemForm addItem={this.addItem}/>
                        </div>

                        <TodoListTasks tasks={getFilterTasks(this.props.tasks)}
                                       changeStatus={this.changeStatus}
                                       changeTitle={this.changeTitle}/>

                        <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>

                    </div>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todolistId) => {
            const action = {type: 'ADD-TASK', newTask, todolistId};
            dispatch(action)
        }
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodolist;