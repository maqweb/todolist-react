import React from 'react';
import './App.css';
import TodoListHeader from './components/TodoListHeader/TodoListHeader';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';
import TodoListFooter from './components/TodoListFooter/TodoListFooter';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    state = {
        tasks: [
            {title: 'HTML', isDone: true, priority: 'low'},
            {title: 'CSS', isDone: true, priority: 'low'},
            {title: 'JS', isDone: true, priority: 'medium'},
            {title: 'React', isDone: false, priority: 'high'},
            {title: 'Redux', isDone: false, priority: 'high'}
        ],
        filterValue: "All"
    };

    onAddTaskClick = () => {
        let newText = this.newTaskTitleRef.current.value;
        let newTask = {
            title: newText,
            isDone: true,
            priority: 'no'
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks});
        this.newTaskTitleRef.current.value = '';
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">

                    {/*<div className="todoList-header">*/}
                    {/*    <h3 className="todoList-header__title">What to Learn</h3>*/}
                    {/*    <div className="todoList-newTaskForm">*/}
                    {/*        <input ref={this.newTaskTitleRef} type="text" placeholder="New task name" />*/}
                    {/*        <button onClick={ this.onAddTaskClick }>Add</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <TodoListHeader onAddTaskClick={this.onAddTaskClick} newTaskTitleRef={this.newTaskTitleRef}/>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

