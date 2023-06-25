import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import ModalAddNew from "./components/ModalAddNew";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 d-flex justify-content-between align-items-center">
          <span>
            <b>List user</b>
          </span>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setIsShowModalAddNew(false)}
      />
    </div>
  );
}

export default App;
