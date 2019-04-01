import React from "react";

export default class NewTask extends React.Component {
  state = {
    text: ""
  };
  render() {
    const { onAddtask } = this.props;
    const { text } = this.state;
    return (
      <div className="new-task">
        <input
          type="text"
          className="new-task__input"
          placeholder="Insira a nova tarefa"
          value={text}
          onChange={event => {
            this.setState({
              text: event.target.value
            });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              onAddtask(event.target.value);

              this.setState({
                text: ""
              });
            }
          }}
        />
      </div>
    );
  }
}
