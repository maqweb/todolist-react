import React from 'react';
import './App.css';
import TodoListHeader from './components/TodoListHeader/TodoListHeader';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';

class App extends React.Component {

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
        localStorage.setItem('our-state', stateAsString)
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };

    addTask = (newText) => {
        let newTask = {
            id: this.state.tasks.length + 1,
            title: newText,
            isDone: false,
            priority: 'no'

        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks}, () => {this.saveState()});
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {this.saveState()})
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
        }, () => {this.saveState()})
    };

    render = () => {

        const getFilterTasks = (tasks) => {
            return (
                tasks.filter(t => {
                    if (this.state.filterValue === 'All') {
                        return true;
                    } else if (this.state.filterValue === 'Active') {
                        return t.isDone === false;
                    } else if (this.state.filterValue === 'Completed') {
                        return t.isDone === true;
                    }
                })
            )
        };

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>

                    <TodoListTasks tasks={getFilterTasks(this.state.tasks)}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}/>

                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
                </div>
            </div>
        );
    }
}

export default App;

