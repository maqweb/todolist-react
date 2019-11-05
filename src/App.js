import React from 'react';
import './App.css';
import TodoListHeader from './components/TodoListHeader/TodoListHeader';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';

class App extends React.Component {

     tasks = [
        {title: 'HTML', isDone: true, priority: 'low'},
        {title: 'CSS', isDone: true, priority: 'low'},
        {title: 'JS', isDone: true, priority: 'medium'},
        {title: 'React', isDone: false, priority: 'high'},
        {title: 'Redux', isDone: false, priority: 'high'}
    ];

     filterValue = "All";

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

