import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';
import Todo from './components/todo';
import Db from './constants/firebase';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loader, setLoad] = useState(true);

  // fireBase Api to add the collection
  const onClikBuuton = (event) => {
    event.preventDefault();
    Db.collection('todos').add({
      todo: input,
      timeStamp: new Date().getTime()
    })
    setInput('');
  }

  // fireBase Api to delte the collection
  const delteTodo = (id) => {
    Db.collection('todos').doc(id).delete();
  }

  useEffect(() => {
    console.log("useEffect hooks calling");

    setLoad(true);

    // Ffirebase Api to fetch the data by order
    Db.collection('todos').orderBy('timeStamp', 'desc').onSnapshot(snapshot => {

      snapshot.docs.map(field => ({ id: field.id, todo: field.data().todo }));

      console.log("useEffect hooks calling as snapchat");

      setTodos(snapshot.docs.map(field => ({ id: field.id, todo: field.data().todo })
      ))
      setLoad(false);
    })
  }, []);

  return (
    <div className="App">
      <h1>Hello Welcome to TODO App! </h1>

      <form>
        <FormControl>
          <InputLabel htmlFor="input-with-icon-adornment">With a a Todo here..</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={input} onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit" disabled={!input} variant="contained" color="primary" onClick={(event) => onClikBuuton(event)}>Add TODO</Button>

        </FormControl>
      </form>

      {loader ? <div style={{ margin: '20px', fontWeight: 'bold' }}> Loading ....</div> :
        todos.length > 0 ? todos.map((todo, index) =>
          (
            <Todo key={index} todo={todo} delteTodo={() => delteTodo(todo.id)} />
          )
        )
          :
          <div style={{ margin: '20px', fontWeight: 'bold' }}>Todos Not Found..</div>
      }

    </div >
  );
}

export default App;
