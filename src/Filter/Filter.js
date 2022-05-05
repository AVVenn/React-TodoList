import React, { useState } from "react";
import { Box, TextInput, Select } from "grommet";
import { Search } from "grommet-icons";
import { FILTER_TYPE } from "../constants/filter";

function Filter({ setCurrentFiLter, setSearchTodos }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [valueSelect, setValueSelect] = useState(FILTER_TYPE.all);

  return (
    <Box
      direction="row"
      gap="small"
      margin={{ top: "small", bottom: "medium" }}
    >
      <TextInput
        value={searchQuery}
        onChange={({ target: { value } }) => {
          setSearchQuery(value);
          setSearchTodos((prevTodos) => (prevTodos = value));
        }}
        placeholder="Найти"
        size="large"
        icon={<Search />}
      />
      <Select
        options={Object.values(FILTER_TYPE)}
        value={valueSelect}
        onChange={({ option }) => {
          setValueSelect(option);
          setCurrentFiLter(option);
        }}
      />
    </Box>
  );
}

export default Filter;
