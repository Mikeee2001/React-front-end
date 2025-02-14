import React, { useEffect, useState } from "react";
import axios from "axios";


import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/index.css";

import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
    auth_role: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
        setLoading(false);
      });
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        })
        .then((response) => {
          fetchData(); // Refresh the user list
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Error deleting user");
        });
    }
  };

  const saveUser = () => {
    const method = isEditMode ? "put" : "post";
    const url = isEditMode ? `/api/users/${currentUser.id}` : "/api/users";

    const userPayload = isEditMode
      ? {
        name: currentUser.name,
        email: currentUser.email,
        auth_role: currentUser.auth_role,
      }
      : currentUser;

    axios[method](url, userPayload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((response) => {
        fetchData(); // Refresh the user list
        setShowModal(false); // Close the modal
        setCurrentUser({ id: null, name: "", email: "", auth_role: "" }); // Reset current user
        toast.success(`User ${isEditMode ? "updated" : "saved"} successfully`);
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        toast.error("Error saving user");
      });
  };

  const openModal = (user) => {
    setIsEditMode(!!user); // Check if we're in edit mode
    setCurrentUser(user || { id: null, name: "", email: "", auth_role: "" }); // Set current user or default values
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">User Details</h1>
      <Link className="mb-4 btn btn-primary" style={{ marginRight: "10px" }} to="/admin/dashboard">
        Back
      </Link>
      <Button onClick={() => openModal()} className="mb-4 btn btn-success mr-2">
        Add User
      </Button>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <span className="loader"></span>
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.auth_role}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn btn-danger btn-sm"
                        style={{ marginRight: "10px" }}
                      >
                        <FontAwesomeIcon icon={faTrash} size="2x" />
                      </button>
                      <button
                        onClick={() => openModal(user)}
                        className="btn btn-primary btn-sm"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
            </Form.Group>
            {!isEditMode && (
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentUser.password}
                  onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={currentUser.auth_role}
                onChange={(e) => setCurrentUser({ ...currentUser, auth_role: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUser}>
            {isEditMode ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default UserList;
