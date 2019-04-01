import React from "react";

export default class FilterButtons extends React.Component {
  state = {
    taskStep: 0
  };
  render() {
    const { onSelectTaskStep } = this.props;
    const { taskStep } = this.state;
    return (
      <div>
        <button
          className="search-task__filter"
          onClick={() => {
            onSelectTaskStep();
          }}
        >
          Tarefas Feitas
          <i className="material-icons">done</i>
        </button>

        <button
          className="search-task__filter"
          onClick={() => {
            onSelectTaskStep();
          }}
        >
          Tarefas Novas
          <i className="material-icons">new_releases</i>
        </button>
      </div>
    );
  }
}
