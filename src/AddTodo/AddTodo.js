import React, { useState } from "react";
import { Box, Button, TextInput } from "grommet";
import { Checkmark } from "grommet-icons";

function AddTodo({ addTodo, inputText }) {
  const [value, setValue] = useState("");
  const onChange = (event) => setValue(event.target.value);

  return (
    <Box
      direction="row"
      gap="xsmall"
      margin={{
        bottom: "medium",
      }}
    >
      <TextInput
        value={value}
        onChange={onChange}
        placeholder="Ввведите заметку"
        size="large"
        ref={inputText}
      />
      <Button
        primary
        label="Добавить"
        color="orange"
        onClick={() => {
          if (value === "") return;
          addTodo(value);
          setValue("");
          inputText.current.focus();
        }}
        onKeyPress={(e) => {
          const code = e.keyCode || e.which;
          if (code === 13 && e.target.value.trim() !== "") {
            addTodo(value);
          }
        }}
        icon={<Checkmark />}
      />
    </Box>
  );
}

export default AddTodo;
