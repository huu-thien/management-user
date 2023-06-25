import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ModalAddNew from "./ModalAddNew";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalEditUser from "./ModelEditUser";
import ModalConfirmRemove from "./ModalConfirmRemove";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";

import "./TableUser.scss";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalRemove, setIsShowModalRemove] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserRemove, setDataUserRemove] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

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
  };
  const handleRemoveUserFromModal = (userRemove) => {
    const listUsersCopy = _.cloneDeep(listUsers);
    const listUserAfterRomove = listUsersCopy.filter(
      (user) => user.id !== userRemove.id
    );
    console.log(listUserAfterRomove);
    setListUsers(listUserAfterRomove);
  };
  const handlePageClick = (e) => {
    getUsers(+e.selected + 1);
  };
  // Sort
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    // console.log(sortBy, sortField);

    let listUsersCopy = _.cloneDeep(listUsers);
    listUsersCopy = _.orderBy(listUsersCopy, [sortField], [sortBy]);
    // console.log(listUsersCopy);
    setListUsers(listUsersCopy);
  };
  // Search by email
  const handleSearch = debounce((e) => {
    let keySearch = e.target.value;
    if (keySearch) {
      let listUsersCopy = _.cloneDeep(listUsers);
      listUsersCopy = listUsersCopy.filter((user) =>
        user.email.includes(keySearch)
      );
      setListUsers(listUsersCopy);
    } else {
      getUsers(1);
    }
  }, 500);

  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <span>
          <b>List user</b>
        </span>
        <div className="group-btn">
          <button
            className="btn btn-outline-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-user-plus mx-2"></i>
            <span>Add new </span>
          </button>
          <label htmlFor="import_scv" className="btn btn-outline-primary">
            <i className="fa-solid fa-file-import mx-2"></i>Import
          </label>
          <input type="file" id="import_scv" hidden />
          <CSVLink
            data={[]}
            filename="user.scv"
            className="btn btn btn-outline-primary"
          >
            <i className="fa-solid fa-file-arrow-down mx-2"></i>
            Export
          </CSVLink>
        </div>
      </div>
      <div className="col-4 my-4">
        <input
          onChange={(e) => handleSearch(e)}
          type="text"
          className="form-control"
          placeholder="Search user by email..."
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
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
        handleRemoveUserFromModal={handleRemoveUserFromModal}
      />
    </>
  );
};

export default TableUsers;
