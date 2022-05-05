import "./App.css";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

let list = [];

function App() {
  const inputRef = useRef(null);
  const [input, setInput] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleUpdate = (id) => {
    setEdit(true);

    if (!input) return;
    list.splice(id, 1, input);

    setInput("");
  };
  const handleEdit = () => {
    if (!list.includes(list[0])) return;

    setEdit(true);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (!input) return;

    list = list.concat(input);

    setInput([]);
  };
  const handleDelete = (index) => {
    list = list.filter((_, i) => i !== index);

    setInput([]);
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="app">
      <h1>To Do Application</h1>

      <Wrapper>
        {edit === true ? (
          <Wrap>
            <>
              <CustomInput2
                maxLength="35"
                value={input}
                type="text"
                placeholder="Edit"
                onChange={(e) => setInput(e.target.value)}
              />
            </>
          </Wrap>
        ) : (
          <Wrap>
            <>
              <CustomInput
                maxLength="35"
                ref={inputRef}
                value={input}
                type="text"
                placeholder="Add your Todo"
                onChange={(e) => setInput(e.target.value)}
              />
              <CustomButton type="submit" onClick={handleAdd}>
                Add Todo
                <EditIcon onClick={handleEdit} />
              </CustomButton>
            </>
          </Wrap>
        )}

        {list.map((li, i) => (
          <Li key={i}>
            {`${i + 1}.`} {li}
            <ButtonWrap>
              <CloseIcon onClick={() => handleDelete(i)} />

              {edit === true ? (
                <CustomButton2
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdate(i);
                    setEdit(false);
                  }}
                >
                  Update
                </CustomButton2>
              ) : (
                ""
              )}
            </ButtonWrap>
          </Li>
        ))}
      </Wrapper>
    </div>
  );
}

export default App;

const Wrapper = styled.form`
  background-color: #151724;
  height: 461px;
  width: 531px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: top;
  flex-direction: column;
  overflow-y: hidden;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

const Wrap = styled.div`
  margin-top: 50px;
  display: flex;
  width: 350px;
  height: 35px;
  justify-content: space-between;
  border: 1px solid #6c08fd;
  border-radius: 8px;
`;

const CustomInput = styled.input`
  background-color: transparent;
  color: white;
  border: 0px;
  outline: 0px;
  height: 100%;
`;
const CustomInput2 = styled(CustomInput)``;

const CustomButton = styled.button`
  padding: 4px;
  width: 30%;
  height: 100%;
  background-image: linear-gradient(to right, #550bff, #8b00f9);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .MuiSvgIcon-root {
    cursor: pointer;
    border: 1px solid white;
    border-radius: 6px;
    width: 20px;
    height: 20px;
  }
`;
const CustomButton2 = styled.div`
  cursor: pointer;
`;

const Li = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  height: 55px;
  width: 400px;
  background-image: linear-gradient(to right, #550bff, #8b00f9);
  padding: 0 10px;
  margin-top: 5px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
