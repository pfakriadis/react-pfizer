import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "../actions/todosActions";
import { updateInput } from "../actions/inputActions";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const { todos, isLoading, hasError, input } = useSelector((state) => state);
  const dispatch = useDispatch();
  const addToDo = (e) => {
    e.preventDefault();
    const todo = { id: todos.items.length + 1, title: input, done: false };

    dispatch(addTodo(todo));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="container">
      <h2>My ToDos</h2>
      <hr />
      <form onSubmit={addToDo}>
        Add ToDo:{" "}
        <input
          value={input}
          onChange={(e) => dispatch(updateInput(e.target.value))}
          type="text"
        />
        <button type="submit">Add ToDo</button>
      </form>
      <br />
      {isLoading ? (
        <h5>Loading...</h5>
      ) : (
        <ul>
          {todos.items.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
      {hasError && !isLoading && <h5>Cannot fetch todos 😢</h5>}
    </div>
  );
};

export default TodoApp;
