import 'react-responsive-modal/styles.css';
import styled from 'styled-components';
import {Form, Button} from 'react-bootstrap';
import React from 'react';
import axios from 'axios';

const Styles = styled.div`
  .jumbo {
    background-color: DarkSlateGrey;
    background-size: cover;
    color: #efefef;

    position: relative;
    z-index: -2;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 60px;
  }
  .overlay {
    background-color: white;
    opacity: 0.6;
    position: absolute;
    margin-top: 20px;
    margin-bottom: 20px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  .center {
    text-align: center;
    color: white;
    padding: 25px;
    border-width: thin;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 25px;
    background-size: 300px 100px;
    background-position: center;
    background: url("image.jpg");
  }
  .addtodo {
    font-size: 25px;
    text-align: center;
    margin-left: 5px;
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
  }
  .add {
    margin-left: 200px;
  }
  .text {
    margin: 230px;
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
  .form {
  }
`;
export default class AddTodo extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      todo: this.props.todo,
      task: '',
      description: '',
    };
  }
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState ({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault ();

    const todo_list = {
      task: this.state.task,
      description: this.state.description,
    };
    if (typeof this.state.todo != 'undefined') {
      if (this.state.todo.id) {
        if (todo_list.task === '' || todo_list.description === '') {
          alert ('You need to enter a new task!!');
        } else if (todo_list.task !== '') {
          axios
            .put (
              `http://localhost:8080/api/todos/${this.state.todo.id}/`,
              todo_list
            )
            .then (res => this.refreshPage ());
          return;
        }
      }
    }
    if (todo_list.task === '' || todo_list.description === '') {
      alert ('You need to enter a task!!');
    } else if (todo_list.task !== '') {
      axios.post (`http://localhost:8080/api/todos/`, todo_list).then (res => {
        this.refreshPage ();
        console.log (res.data);
      });
    }
  };

  refreshPage = () => {
    window.location.reload (false);
  };
  render () {
    return (
      <div>
        <Styles>
          <div className="add">
            <h2>ADD TODO</h2>
          </div>

          <Form onSubmit={this.handleSubmit.bind (this)}>
            <div>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="title"
                  type="text"
                  name="task"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted" />
              </Form.Group>
            </div>
            <div>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="description"
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </div>
            <div>
              <Button className="button" variant="primary" type="submit">
                Save Task
              </Button>
            </div>
          </Form>
        </Styles>
      </div>
    );
  }
}
