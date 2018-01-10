import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import {Grid} from '@progress/kendo-grid-react-wrapper';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class ProductSearch extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
          <input
              className={style.toggleAll}
              type="checkbox"
              checked={completedCount === todos.length}
              onChange={actions.completeAll}
          />
      );
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
          <Footer
              completedCount={completedCount}
              activeCount={activeCount}
              filter={filter}
              onClearCompleted={this.handleClearCompleted}
              onShow={this.handleShow}
          />
      );
    }
  }

  render() {
    const { } = this.props;
    const { filter } = this.state;

    let dataSource = new kendo.data.DataSource({
      data: [
        { "rank": 1,  "rating": 9.2, "year": 1994, "title": "The Shawshank Redemption" },
        { "rank": 2,  "rating": 9.2, "year": 1972, "title": "The Godfather" },
        { "rank": 3,  "rating": 9,   "year": 1974, "title": "The Godfather: Part II" },
        { "rank": 4,  "rating": 8.9, "year": 1966, "title": "Il buono, il brutto, il cattivo." },
        { "rank": 5,  "rating": 8.9, "year": 1994, "title": "Pulp Fiction" },
        { "rank": 6,  "rating": 8.9, "year": 1957, "title": "12 Angry Men" },
        { "rank": 7,  "rating": 8.9, "year": 1993, "title": "Schindler's List" },
        { "rank": 8,  "rating": 8.8, "year": 1975, "title": "One Flew Over the Cuckoo's Nest" },
        { "rank": 9,  "rating": 8.8, "year": 2010, "title": "Inception" },
        { "rank": 10, "rating": 8.8, "year": 2008, "title": "The Dark Knight" }
      ]
    });

    let gridOptions = {
      dataSource,
        navigatable: true,
        pageable: true,
        height: 550,
        toolbar: ['save', 'cancel'],
        columns: [
      {field: "rank", title: "rank"},
      {field: "rating", title: "rating"},
      {field: "year", title: "year", width: '30%'},
      {field: "title", title: "title"},
      {command: "destroy", title: "&nbsp;"}],
        editable: true,
        sortable: true,
        groupable: true,
        noRecords: {
      template: "No data available on current page. Current page is: #=this.dataSource.page()#"
    }
  };

    return (
      <div>
        <Grid {...gridOptions}/>
      </div>
    );
  }
}
