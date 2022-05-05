import React, { useState } from "react";
import { Layer, Box, Button, TextInput } from "grommet";
import { Close } from "grommet-icons";

Modal.parameters = {
  chromatic: { disable: true },
};

function Modal({ changeValueTodo, openAndCloseModalWindow, text, id }) {
  const [modalInputValue, setModalInputValue] = useState(text);
  return (
    <Layer>
      <Box
        fill
        round="small"
        background="light-3"
        align="center"
        justify="center"
        gap="small"
        alignSelf="center"
        pad="medium"
      >
        <Button
          alignSelf="end"
          justify="start"
          icon={<Close color="red" />}
          onClick={() => {
            openAndCloseModalWindow();
          }}
          hoverIndicator
        />
        <TextInput
          value={modalInputValue}
          onChange={(event) => {
            setModalInputValue(event.target.value);
          }}
          size="large"
        />
        <Button
          primary
          label="Изменить"
          color="orange"
          onClick={() => {
            changeValueTodo(id, modalInputValue);
            openAndCloseModalWindow();
          }}
        />
      </Box>
    </Layer>
  );
}

export default React.memo(Modal);
