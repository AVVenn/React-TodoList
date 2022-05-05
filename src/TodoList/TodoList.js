import React, { useContext } from "react";
import { Box, Grid, Text, ResponsiveContext } from "grommet";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  toggleFieldIsCompleted,
  removeTodo,
  changeValueTodo,
}) {
  const size = useContext(ResponsiveContext);

  if (!todos.length) {
    return (
      <Text size="4xl" textAlign="center" margin={{ vertical: "medium" }}>
        Заметок нет
      </Text>
    );
  }

  return (
    <Box>
      <Grid
        columns={size !== "small" ? "small" : "100%"}
        gap="medium"
        fill="horizontal"
        // columns={{
        //   count: 4,
        //   size: "auto",
        // }}
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
            id={todo.id}
            toggleFieldIsCompleted={toggleFieldIsCompleted}
            removeTodo={removeTodo}
            changeValueTodo={changeValueTodo}
          />
        ))}
      </Grid>
    </Box>
  );
}
export default React.memo(TodoList);
