import React, { useState, useEffect } from "react";
import axios from "axios";
import Page from "./Page";

import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
function Homepage() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);

  const [modifiedData, setModifiedData] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    retrieveUsers();
  }, [page]);

  const retrieveUsers = async () => {
    const response = await axios.get(
      `https://reqres.in/api/users/?page=${page}`
    );

    setUsers(response.data.data);
  };
  const previousPage = async () => {
    if (page === 1) {
    } else {
      setPage((page) => page - 1);
    }

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );

    setUsers(response.data.data);
  };

  const nextPage = async () => {
    setPage((page) => page + 1);

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );

    setUsers(response.data.data);
  };

  const handleAdd = () => {
    setModifiedData({ ...modifiedData, id: users.length + 1 });

    axios.post("https://reqres.in/api/users", modifiedData).then((response) => {
      setUsers([response.data, ...users]);
    });

    toggle();
  };

  const handleDelete = (id) => {
    axios.delete(`https://reqres.in/api/users/1`);
    setUsers(users.filter((x) => x.id !== id));
  };

  return (
    <div className="grid place-center h-view px-70">
      <Button
        onClick={() => toggle(null, "add")}
        color="primary"
        className="adduser flex items-end gap-5px"
      >
        Add New User
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>ADD NEW USER</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="First Name">First Name</Label>
            <Input
              id="First Name"
              name="firstname"
              placeholder="Enter First Name"
              type="text"
              onChange={(e) =>
                setModifiedData({ ...modifiedData, first_name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="Last name">Last Name</Label>
            <Input
              id="Last name"
              name="lastname"
              placeholder="Enter Last Name"
              type="text"
              onChange={(e) =>
                setModifiedData({ ...modifiedData, last_name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              id="Email"
              name="email"
              placeholder="Enter Email"
              type="email"
              onChange={(e) =>
                setModifiedData({ ...modifiedData, email: e.target.value })
              }
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAdd}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr className="theader">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            <>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td className="items-center gap-5px ">{user.first_name}</td>
                  <td className="items-center gap-5px ">{user.last_name}</td>
                  <td>{user.email}</td>
                  <td className="cursor-pointer">
                    <Link to={`/edituser/${user.id}`}>
                      <Button color="info">Edit</Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <h1 className="center-component">No Data...</h1>
          )}
        </tbody>
      </Table>
      <Page page={page} previousPage={previousPage} nextPage={nextPage} />
    </div>
  );
}

export default Homepage;
