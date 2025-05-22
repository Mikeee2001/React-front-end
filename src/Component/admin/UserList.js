import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/index.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
    role_as: "user", // Default role as string
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch user data
  const fetchData = () => {
    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to delete a user
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        })
        .then(() => {
          fetchData(); // Refresh user list
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Error deleting user");
        });
    }
  };

  // Function to save or update user
  const saveUser = () => {
    const requestType = currentUser.id ? "put" : "post";
    const url = currentUser.id ? `/api/users/${currentUser.id}` : "/api/users";

    const userPayload = {
      name: currentUser.name,
      email: currentUser.email,
      password: currentUser.password || undefined,
      role_as: currentUser.role_as, // Send as string ("user", "admin", "doctor")
    };

    console.log("Sending user data:", userPayload); // Debugging log

    axios[requestType](url, userPayload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
    })
      .then(() => {
        fetchData();
        setShowModal(false);
        setCurrentUser({ id: null, name: "", email: "", password: "", role_as: "user" });
        toast.success(`User ${isEditMode ? "updated" : "added"} successfully`);
      })
      .catch((error) => {
        console.error("Error saving user:", error.response?.data || error);
        toast.error("Error saving user");
      });
  };

  // Open modal for Add/Edit user
  const openModal = (user) => {
    setIsEditMode(!!user);
    setCurrentUser(user || { id: null, name: "", email: "", password: "", role_as: "user" });
    setShowModal(true);
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">User Details</h1>
      <Button onClick={() => openModal()} className="mb-4 btn btn-success me-2">
        Add User
      </Button>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered table-striped">
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No users found</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role_as}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn btn-danger btn-sm me-2"
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </button>
                      <button
                        onClick={() => openModal(user)}
                        className="btn btn-primary btn-sm"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit User */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
            </Form.Group>
            {!isEditMode && (
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={currentUser.password || ""}
                  onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={currentUser.role_as}
                onChange={(e) => setCurrentUser({ ...currentUser, role_as: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={saveUser}>{isEditMode ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default UserList;
