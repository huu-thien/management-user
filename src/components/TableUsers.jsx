import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ModalAddNew from "./ModalAddNew";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalEditUser from "./ModelEditUser";
import ModalConfirmRemove from "./ModalConfirmRemove";
import _, { debounce } from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

import "./TableUser.scss";
import { toast } from "react-toastify";

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

  // Data export
  const [dataExport, setDataExport] = useState([]);

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

  // Edit user
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

  // Remove user
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

  // Pagination
  const handlePageClick = (e) => {
    getUsers(+e.selected + 1);
  };

  // Sort
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let listUsersCopy = _.cloneDeep(listUsers);
    listUsersCopy = _.orderBy(listUsersCopy, [sortField], [sortBy]);
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
  // Export data csv
  const getUserExport = (event, done) => {
    let result = [];
    console.log(listUsers);
    if (listUsers && listUsers.length > 0) {
      result.push(["ID", "First Name", "Last Name", "Email"]);
      listUsers.map((user) => {
        let arr = [];
        arr[0] = user.id;
        arr[1] = user.first_name;
        arr[2] = user.last_name;
        arr[3] = user.email;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  //Import data
  const handleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv file...");
        return;
      }
      // Parse local CSV file
      Papa.parse(file, {
        // header: true,
        complete: function (result) {
          let rawCSV = result.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "first_name" ||
                rawCSV[0][1] !== "last_name" ||
                rawCSV[0][2] !== "email"
              ) {
                toast.error("Wrong format header CSV file !");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    (obj.first_name = item[0]),
                      (obj.last_name = item[1]),
                      (obj.email = item[2]);
                    result.push(obj);
                  }
                });
                setListUsers(result);
              }
            } else {
              toast.error("Wrong format CSV file !");
            }
          } else {
            toast.error("Not found  data on CSV file !");
          }
          console.log("finished: ", result);
        },
      });
    }
  };

  return (
    <>
      <div className="my-3 d-sm-flex  justify-content-between align-items-center">
        <span className="">
          <b>List user</b>
        </span>
        <div className="group-btn mt-sm-0 mt-2">
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
          <input
            onChange={(e) => handleImportCSV(e)}
            type="file"
            id="import_scv"
            hidden
          />
          <CSVLink
            data={dataExport}
            asyncOnClick={true}
            onClick={getUserExport}
            filename="user.csv"
            className="btn btn btn-outline-primary"
          >
            <i className="fa-solid fa-file-arrow-down mx-2"></i>
            Export
          </CSVLink>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-4">
        <input
          onChange={(e) => handleSearch(e)}
          type="text"
          className="form-control"
          placeholder="Search user by email..."
        />
      </div>
      <div className="customize-table">
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
      </div>
      <ReactPaginate
        className="pagination"
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
