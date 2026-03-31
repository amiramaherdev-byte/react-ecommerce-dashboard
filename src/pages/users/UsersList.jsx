import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Spinner,
  Table,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Pencil, Trash, Eye, ThreeDotsVertical } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../features/users/usersThunks";
import {
  setSearch,
  setCurrentPage,
  deleteLocalUser,
} from "../../features/users/usersSlice";
import CustomModal from "../../components/UI/CustomModal";
import SearchInput from "../../components/ٍSearch/SearchInput";
import Pagination from "../../components/Pagination/Pagination";
import { toast } from "react-toastify";
import UserForm from "../../components/Users/UserForm";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, search, currentPage, totalUsers, error } =
    useSelector((state) => state.users);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const openModal = (user = null) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    dispatch(fetchUsers({ search, page: currentPage, limit: itemsPerPage }))
      .unwrap()
      .catch((err) => toast.error(err));
  }, [dispatch, search, currentPage]);

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
      console.error(err);
    }
  };
  return (
    <Container>
      {error && <p className="mt-4 text-danger">{error}</p>}

      {/* Search */}
      <Form className="mt-4 mb-3">
        <SearchInput
          value={search}
          onChange={(val) => dispatch(setSearch(val))}
          placeholder="Search Users..."
          className="form-control"
        />
      </Form>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Users</h4>
            <Button variant="primary" onClick={() => openModal()}>
              + Add User
            </Button>
          </div>

          <Table striped hover responsive>
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
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          style={{ border: "none" }}
                        >
                          <ThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => openModal(user)}>
                            <Eye /> View / Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => openModal(user)}
                            className="text-warning"
                          >
                            <Pencil /> Edit
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

          {/* Modal for Add/Edit */}
          <CustomModal
            show={showModal}
            handleClose={closeModal}
            title={selectedUser ? "Edit User" : "Add User"}
          >
            <UserForm
              user={selectedUser}
              closeModal={closeModal}
              dispatch={dispatch}
            />
          </CustomModal>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </Container>
  );
};

export default UsersList;
