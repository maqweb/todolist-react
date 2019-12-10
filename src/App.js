import React from 'react';
import './App.css';
import TodoList from "./TodoList.jsx";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";

class App extends React.Component {

    state = {
        todolists: []
    };

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-todo-list', stateAsString)
    };

    restoreState = () => {

        let state = this.state;
        let stateAsString = localStorage.getItem('our-todo-list');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state)
    };

    addTodoList = (newTitle) => {
        let newTodoList = {
            id: this.state.todolists.length + 1,
            title: newTitle
        };
        this.setState({
            todolists: [...this.state.todolists, newTodoList]
        }, this.saveState)
    };

    render = () => {

        const todoLists = this.state.todolists.map(tl => <TodoList id={tl.id} key={tl.id} title={tl.title}/>);

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

export default App;

