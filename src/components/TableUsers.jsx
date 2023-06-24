import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchALlUser } from "../services/UserService";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // call apis
    getUsers();
  }, []);
  const getUsers = async () => {
    let res = await fetchALlUser();
    if (res && res.data && res.data.data) {
      setListUsers(res.data.data);
    }
  };
  // console.log(listUsers);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
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
              <td>@{user.email}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableUsers;
