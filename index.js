import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
//import uuid from "uuid/v1";
import NewTask from "./components/new-task";
import SearchTask from "./components/search-task";
import FilterButtons from "./components/filters";

import "./index.scss";
class App extends React.Component {
  state = {
    isLoaded: false,
    tasks: []
  };

  componentDidMount() {
    fetch(`http://5ca10519c1b53400149ac9d8.mockapi.io/v1/tasks`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            tasks: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleAddtask = text => {
    fetch("http://5ca10519c1b53400149ac9d8.mockapi.io/v1/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        time: new Date().toLocaleString()
      })
    });
  };

  handleMove = (direction, index) => {
    this.setState(prevState => {
      const newtasks = prevState.tasks.slice();
      const removedtask = newtasks.splice(index, 1)[0];

      if (direction === "up") {
        newtasks.splice(index - 1, 0, removedtask);
      } else {
        newtasks.splice(index + 1, 0, removedtask);
      }
      return {
        tasks: newtasks
      };
    });
  };

  handleDelete = id => {
    fetch("http://5ca10519c1b53400149ac9d8.mockapi.io/v1/tasks" + "/" + id, {
      method: "delete"
    });
    newTasks = fetch("http://5ca10519c1b53400149ac9d8.mockapi.io/v1/tasks");
    return {
      tasks: newTasks
    };
  };

  /* handleDelete = id => {
    this.setState(prevState => {
      const newtasks = prevState.tasks.slice();
      const index = newtasks.findIndex(task => task.id === id);
      newtasks.splice(index, 1);
      return {
        tasks: newtasks
      };
    });
  };*/

  handeSearch = (texto, clear) => {
    this.setState(prevState => {
      const newTasks = prevState.tasks.slice();
      const matchesTasks = newTasks.filter(task => task.text.includes(texto));

      return {
        tasks: matchesTasks
      };
    });
  };
  /*
  handleSelectTaskStep = taskStep => {
    this.setState(prevState => {
      const newTasks = prevState.tasks.slice();
      const taskDone = 
    });
  };*/

  render() {
    return (
      <div className="container">
        <SearchTask
          onSearch={this.handeSearch}
          onClearFilter={this.handleClearFilter}
        />
        <FilterButtons
          onSelectTaskStep={this.handleSelectTaskStep}
          onClearFilter={this.handleClearFilter}
        />
        <NewTask onAddtask={this.handleAddtask} />
        <TaskList
          tasks={this.state.tasks}
          onMove={this.handleMove}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const TaskList = ({ tasks, onMove, onDelete }) => (
  <div className="task-list">
    {tasks.map((task, index) => (
      <div key={task.id} className="task">
        <span className="task__text">{task.text}</span>
        <span className="task__text">{"Created At " + task.time}</span>

        <button
          className="task__button"
          onClick={() => {
            onDone(task.id);
          }}
        >
          <i className="material-icons">done</i>
        </button>

        <button
          className={classNames("task__button", {
            "task__button--hidden": index === 0
          })}
          onClick={() => {
            onMove("up", index);
          }}
        >
          <i className="material-icons">keyboard_arrow_up</i>
        </button>

        <button
          className={classNames("task__button", {
            "task__button--hidden": index === tasks.length - 1
          })}
          onClick={() => {
            onMove("down", index);
          }}
        >
          <i className="material-icons">keyboard_arrow_down</i>
        </button>

        <button
          className="task__button"
          onClick={() => {
            onDelete(task.id);
          }}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    ))}
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
