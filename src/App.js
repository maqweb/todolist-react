import React from 'react';
import './App.css';
import TodoListHeader from './components/TodoListHeader/TodoListHeader';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';

class App extends React.Component {

    state = {
        tasks: [
            {title: 'HTML', isDone: true, priority: 'low', id: 1},
            {title: 'CSS', isDone: true, priority: 'low', id: 2},
            {title: 'JS', isDone: true, priority: 'medium', id: 3},
            {title: 'React', isDone: false, priority: 'high', id: 4},
            {title: 'Redux', isDone: false, priority: 'high', id: 5}
        ],
        filterValue: "All"
    };

    addTask = (newText) => {
        let newTask = {
            title: newText,
            isDone: false,
            priority: 'no',
            id: this.state.tasks.length + 1
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks});
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t !== task) {
                return t;
            } else {
                return {...t, isDone: isDone}
            }
        });
        this.setState({
            tasks: newTasks
        })
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
                                   changeStatus={this.changeStatus}/>

                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
                </div>
            </div>
        );
    }
}

export default App;

