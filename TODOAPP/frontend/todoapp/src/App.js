import React, {Component} from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import styled from 'styled-components';
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';

const Styles = styled.div`
  .rowC {
    display: flex;
    flex-direction: row;
  }
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
  .left {
    margin-left: 80px;
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
`;

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      display: true,
    };
  }
  render () {
    return (
      <Styles>
        <Styles>
          <Jumbo fluid className="jumbo">
            <Container className="center">Todos</Container>
          </Jumbo>
        </Styles>
        <div className="rowC">
          <div className="left">
            <AddTodo />
          </div>

          <div className="left">
            <TodoList />
          </div>
        </div>
      </Styles>
    );
  }
}
export default App;
