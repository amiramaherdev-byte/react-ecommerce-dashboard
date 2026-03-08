import { Container, Dropdown, Form, Spinner, Table } from "react-bootstrap";
import { Pencil, Trash, Eye, ThreeDotsVertical } from "react-bootstrap-icons";
import SearchInput from "../../components/ٍSearch/SearchInput";
import Pagination from "../../components/Pagination/Pagination";
import useUsers from "../../hooks/useUsers";
import { useState } from "react";
import CustomModal from "../../components/UI/CustomModal";
import UserCard from "../../components/Users/UserCard";

const UsersList = () => {
  const {
    users,
    loading,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    err,
  } = useUsers();

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <Container>
      {err && <p className="mt-4 text-danger">{err}</p>}

      <Form className="mt-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search Users..."
        />
      </Form>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          id="dropdown-basic"
                          style={{ border: "none" }}
                        >
                          <ThreeDotsVertical />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => openModal(user)}
                            style={{ cursor: "pointer" }}
                          >
                            <Eye /> View
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Pencil /> Edit
                          </Dropdown.Item>
                          <Dropdown.Item className="text-danger">
                            <Trash /> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Modal */}
          <CustomModal
            show={showModal}
            handleClose={closeModal}
            title="User Details"
          >
            {selectedUser && <UserCard user={selectedUser} />}
          </CustomModal>
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default UsersList;
