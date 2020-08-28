import React from "react";
import axios from "axios";
import {Button, Card} from "react-bootstrap";

import styled from "styled-components";
import AddTodo from "./AddTodo";
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Styles = styled.div`
  .style {
    background-color: DarkSlateGrey;
    color: white;f
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  .table {
    width: 300px;
  }
  .center {
    text-align: center;
    
  }
  .text{
    padding-left: 10px;
    margin-bottom: 30px;
   
  }
  .button {
    margin-left: 150px;
    background-color: DarkSlateGrey;
    color: white;
    width: 200px;
    height: 3em;
    font-family: Century Gothic, sans-serif;
    font-size: 1.2em;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
  }
 
  .update{
    width: 150px;
    height: 2em;
    font-size: 0.9em;
    margin-right: 30px;

  }
  .delete{
    width: 150px;
    height: 2em;
    font-size: 0.9em;
    margin-right: 30px;

  }
  .rowC{
    display: flex;
    flex-direction: row;
    background-color: DarkSlateGrey;
    border-style: solid;
    border-width: 3px;
    border-left-width: 10px;
    border-right-width: 0px;
    border-color: black;
    color: white;f
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  .title {
    width: 300px;
    height: 3em;
    margin-left: 69px;
    margin-bottom: 30px;
  }

  .description {
    width: 300px;
    height: 10em;
    margin-left: 20px;
  }
`;
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      todo: {
        task: "",
        description: "",
      },
      task: "",
      description: "",
      todoList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  refreshList = () => {
    axios.get("http://localhost:8080/api/todos/").then((res) => {
      this.setState({todoList: res.data});
    });
  };
  handleDelete = (task) => {
    axios
      .delete(`http://localhost:8080/api/todos/${task.id}`)
      .then((res) => this.refreshList());
  };
  handleUpdate = (task) => {
    this.setState({todo: task, modal: true});
  };
  onCloseModal = () => {
    this.setState({modal: false});
  };

  render() {
    const {modal} = this.state;
    return (
      <Styles>
        {this.state.todoList.map((task) => (
          <div key={task.id}>
            <Card className="rowC" style={{width: "30rem"}}>
              <Card.Body>
                <Card.Title className="center">{task.task}</Card.Title>
                <Card.Text className="text">{task.description}</Card.Text>
                <div className="button">
                  <Button
                    className="update"
                    onClick={() => this.handleUpdate(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="delete"
                    onClick={() => this.handleDelete(task)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
        {this.state.modal ? (
          <Modal open={modal} onClose={this.onCloseModal} center>
            <AddTodo todo={this.state.todo} />
          </Modal>
        ) : null}
      </Styles>
    );
  }
}
export default TodoList;
