import React from 'react';
import './../../App.css';
import PropTypes from 'prop-types';

class TodoListFooter extends React.Component {

    state = {
      isHidden: false
    };

    onAllFilterClick = () => {
        this.props.changeFilter('All')
    };
    onCompletedFilterClick = () => {
        this.props.changeFilter('Completed')
    };
    onActiveFilterClick = () => {
        this.props.changeFilter('Active')
    };

    onShowFiltersClick = () => {
        this.setState({isHidden: true})
    };
    onHideFiltersClick = () => {
        this.setState({isHidden: false})
    };

    render = (props) => {

        let classForAll = this.props.filterValue === "All" ? "active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "active" : "";
        let classForActive = this.props.filterValue === "Active" ? "active" : "";

        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <div>
                    <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                    <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                    <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                </div>}

                {!this.state.isHidden && <button onClick={this.onShowFiltersClick}>hide</button>}
                {this.state.isHidden && <button onClick={this.onHideFiltersClick}>show</button>}

            </div>
        );
    }
}

export default TodoListFooter;

TodoListFooter.propTypes = {
    filterValue: PropTypes.string
};