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
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [modal, setModal] = useState(false);

  const [modifiedData, setModifiedData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [fetchData, setfetchData] = useState({});
  const [userData, setuserData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    loadusers();
  }, []);

  const handleAdd = (id) => {
    axios.put(`https://reqres.in/api/users/${id}`, modifiedData).then((res) => {
      console.log("R", res.data);
      setuserData(res.data);
      console.log("user", userData);
    });

    navigate("/");
  };
  const loadusers = async () => {
    const results = await axios.get(`https://reqres.in/api/users/${id}`);
    console.log("res", results.data.data);
    setfetchData(results.data.data);
    toggle();
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>EDIT USER</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="First Name">First Name</Label>
            <Input
              id="First Name"
              name="firstname"
              placeholder={fetchData.first_name}
              value={modifiedData.first_name}
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
              placeholder={fetchData.last_name}
              value={modifiedData.last_name}
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
              placeholder={fetchData.email}
              value={modifiedData.email}
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
    </div>
  );
};

export default Edit;
