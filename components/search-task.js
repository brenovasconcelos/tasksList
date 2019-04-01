import React from "react";

export default class SearchTask extends React.Component {
  state = {
    searched: "",
    clear: "true"
  };
  render() {
    const { onSearch } = this.props;
    const { searched } = this.state;
    return (
      <div>
        <input
          type="text"
          className="search-task"
          placeholder="Busque uma tarefa"
          value={searched}
          onChange={event => {
            this.setState({
              searched: event.target.value
            });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              onSearch(event.target.value);
              this.setState({
                searched: ""
              });
            }
          }}
        />
        <button className="search-task__clean">
          <i className="material-icons">refresh</i>
        </button>
      </div>
    );
  }
}
