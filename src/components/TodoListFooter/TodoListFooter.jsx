import React from 'react';
import './../../App.css';
import PropTypes from 'prop-types';

class TodoListFooter extends React.Component {
    render = (props) => {

        let classForAll = this.props.filterValue === "All" ? "active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "active" : "";
        let classForActive = this.props.filterValue === "Active" ? "active" : "";

        return (
            <div className="todoList-footer">
                <button onClick={ () => {this.props.changeFilter('All')}} className={classForAll}>All</button>
                <button onClick={ () => {this.props.changeFilter('Completed')}} className={classForCompleted}>Completed</button>
                <button onClick={ () => {this.props.changeFilter('Active')}} className={classForActive}>Active</button>
            </div>
        );
    }
}

export default TodoListFooter;

TodoListFooter.propTypes = {
    filterValue: PropTypes.string
};