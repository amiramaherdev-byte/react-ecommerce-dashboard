import React, { useState } from "react";
import { Table, Dropdown, Button } from "react-bootstrap";
import { Eye, ThreeDotsVertical, Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser } from "../../features/users/usersThunks";
import { deleteLocalUser } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
const UsersTable = ({ openModal, latestUsers , openEditModal , openViewModal  }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loading, search, currentPage, totalUsers, error } =
    useSelector((state) => state.users);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const tableUsers = latestUsers || users;

  const handleDelete = async (user) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      if (user.isLocal) {
        dispatch(deleteLocalUser(user.id));
        toast.success("Local user deleted");
      } else {
        await dispatch(deleteUser(user.id)).unwrap();
        toast.success("User deleted successfully");
      }
    } catch (err) {
          toast.error(
            err.response?.data?.message || err.message || "Something went wrong",
          );
          if (import.meta.env.DEV) {
            console.error(err);
          }
        }
      };
    

  const closeModal = () => setShowModal(false);


  
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          tableUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td
                style={{
                  maxWidth: "120px",
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {user.email}
              </td>
              <td>{user.role}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="light" style={{ border: "none" }}>
                    <ThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    
                 <Dropdown.Item onClick={() => openViewModal(user)}>
    <Eye /> View
</Dropdown.Item>
                <Dropdown.Item onClick={() => openEditModal(user)}>
    <Eye /> Edit
</Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => handleDelete(user)}
                      className="text-danger"
                    >
                      <Trash /> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UsersTable;
