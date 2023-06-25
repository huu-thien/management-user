import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ModalAddNew from "./ModalAddNew";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalEditUser from "./ModelEditUser";
import ModalConfirmRemove from "./ModalConfirmRemove";
import _ from "lodash";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalRemove, setIsShowModalRemove] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserRemove, setDataUserRemove] = useState({});

  useEffect(() => {
    // call apis
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };
  const handleUpdateTable = (user) => {
    setListUsers([...listUsers, user]);
  };
  const handleEditUSerFromModal = (userEdit) => {
    const listUsersCopy = _.cloneDeep(listUsers);
    const index = listUsers.findIndex((user) => user.id === userEdit.id);
    listUsersCopy[index].first_name = userEdit.first_name;
    setListUsers(listUsersCopy);
  };
  const handleEditUser = (user) => {
    setIsShowModalEdit(true);
    setDataUserEdit(user);
  };
  const handleRemoveUser = (user) => {
    setIsShowModalRemove(true);
    setDataUserRemove(user);
    console.log(user);
  };
  const handlePageClick = (e) => {
    getUsers(+e.selected + 1);
  };
  return (
    <>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => (
              <tr key={`user-${index}`}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td className="">
                  <button
                    type="button"
                    className="btn btn-primary mx-4"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setIsShowModalAddNew(false)}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEdit}
        handleClose={() => setIsShowModalEdit(false)}
        dataUserEdit={dataUserEdit}
        handleEditUSerFromModal={handleEditUSerFromModal}
      />
      <ModalConfirmRemove
        show={isShowModalRemove}
        dataUserRemove={dataUserRemove}
        handleClose={() => setIsShowModalRemove(false)}
      />
    </>
  );
};

export default TableUsers;
