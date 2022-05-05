import React, { useState, useCallback } from "react"; //  useContext,
import { Card, CardBody, CardFooter, CardHeader, Button, Text } from "grommet";
import { Close, Checkmark, Trash, Edit } from "grommet-icons";
import Modal from "../Modal/Modal";
// import { Context } from "../Context";

function TodoItem({
  text,
  id,
  isCompleted,
  toggleFieldIsCompleted,
  removeTodo,
  changeValueTodo,
}) {
  const [openModalTodo, setOpenModalTodo] = useState(false);
  // const { toggleFieldIsCompleted } = useContext(Context);

  const openAndCloseModalWindow = useCallback(() => {
    setOpenModalTodo((prevVal) => !prevVal);
  }, [setOpenModalTodo]);

  console.log(text);

  return (
    <>
      <Card height="small" background="orange" pad="small">
        <CardHeader pad="small" justify="end">
          <Button
            icon={
              isCompleted ? (
                <Checkmark color="status-ok" />
              ) : (
                <Close color="red" />
              )
            }
            hoverIndicator
            onClick={() => {
              toggleFieldIsCompleted(id);
            }}
          />
        </CardHeader>
        <CardBody>
          <Text truncate="tip">{text} </Text>
        </CardBody>
        <CardFooter pad={{ horizontal: "small" }}>
          <Button
            icon={<Edit color="dark-1" />}
            hoverIndicator
            onClick={() => {
              openAndCloseModalWindow();
            }}
          />
          <Button
            icon={<Trash color="dark-1" />}
            hoverIndicator
            onClick={() => {
              removeTodo(id);
            }}
          />
        </CardFooter>
      </Card>
      {openModalTodo && (
        <Modal
          openAndCloseModalWindow={openAndCloseModalWindow}
          changeValueTodo={changeValueTodo}
          text={text}
          id={id}
        />
      )}
    </>
  );
}

export default React.memo(TodoItem);
