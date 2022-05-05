import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Grommet, ResponsiveContext } from "grommet";
import AddTodo from "./AddTodo/AddTodo";
import TodoList from "./TodoList/TodoList";
// import { Context } from "./Context";
import Filter from "./Filter/Filter";
import { FILTER_TYPE } from "./constants/filter";
import { theme } from "./styles/theme";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  // const [todosLS, setTodosLS] = useState(JSON.parse(localStorage.getItem('items')) || []);
  const [currentFilter, setCurrentFiLter] = useState(FILTER_TYPE.all);
  const [searchTodos, setSearchTodos] = useState("");
  const inputText = useRef();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { text, id: uuidv4(), isCompleted: false },
    ]);
    // setTodosLS((todos) => [...todosLS, {text, id: uuidv4(), isCompleted: false }])
  };

  const toggleFieldIsCompleted = useCallback(
    (id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => ({
          ...todo,
          isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
        }))
      );
    },
    [setTodos]
  );

  const removeTodo = useCallback(
    (id) => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)),
    [setTodos]
  );

  const changeValueTodo = useCallback(
    (id, newText) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            todo.text = newText;
          }
          return todo;
        })
      );
    },
    [setTodos]
  );

  const filteredTodos = useMemo(
    () =>
      todos.filter(
        (todo) =>
          (todo.isCompleted && currentFilter === FILTER_TYPE.done) ||
          (!todo.isCompleted && currentFilter === FILTER_TYPE.undone) ||
          currentFilter === FILTER_TYPE.all
      ),
    [currentFilter, todos]
  );

  const filteredAndSearchedTodos = useMemo(
    () =>
      filteredTodos.filter((todo) =>
        todo.text.toLowerCase().includes(searchTodos.toLowerCase())
      ),
    [searchTodos, filteredTodos]
  );

  return (
    // <Context.Provider value={{ toggleFieldIsCompleted }}>
    <Grommet theme={theme} background="dark-1" full>
      <Box pad="small">
        <Filter
          setCurrentFiLter={setCurrentFiLter}
          setSearchTodos={setSearchTodos}
        />
        <AddTodo addTodo={addTodo} inputText={inputText} />
        <TodoList
          todos={filteredAndSearchedTodos}
          toggleFieldIsCompleted={toggleFieldIsCompleted}
          removeTodo={removeTodo}
          changeValueTodo={changeValueTodo}
        />
      </Box>
    </Grommet>
    // </Context.Provider>
  );
}

export default App;
