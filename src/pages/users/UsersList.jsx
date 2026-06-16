import { useEffect, useState } from "react";

import { Pencil, Trash, Eye, ThreeDotsVertical } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../features/users/usersThunks";
import {
  setSearch,
  setCurrentPage,
  deleteLocalUser,
} from "../../features/users/usersSlice";
import { Container, Form, Spinner, Button } from "react-bootstrap";

import Pagination from "../../components/Pagination/Pagination";
import { toast } from "react-toastify";
import UserForm from "../../components/Users/UserForm";
import { FaUsers } from "react-icons/fa";
import UsersTable from "../../components/Users/UsersTable";
import CustomModal from "../../components/UI/CustomModal";
import SearchInput from "../../components/Search/SearchInput";

const UsersList = () => {

    const { user: loggedInUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { users, loading, search, currentPage, totalUsers, error } =
    useSelector((state) => state.users);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const openModal = (user = null) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);


  useEffect(() => {
    dispatch(
      fetchUsers({
        search,
        page: currentPage,
        limit: itemsPerPage,
        sortBy,
      }),
    )
      .unwrap()
      .catch((err) => toast.error(err));
  }, [dispatch, search, currentPage, sortBy]);

  return (
    <Container>
      <div
        className="topbar text-white px-4 py-3 mb-4 rounded-4 shadow"
        style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="bg-white text-success rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "50px", height: "50px" }}
          >
            <FaUsers size={22} />
          </div>

          <div>
            <h3 className="mb-0 fw-bold">Users</h3>
            <p className="mb-0 text-light opacity-75">
              Manage users and account information
            </p>
          </div>
        </div>
      </div>
      {error && toast.error({ error })}

      {/* Search */}
      <Form className="mt-4 mb-3 d-flex gap-2">
        <SearchInput
          value={search}
          onChange={(val) => dispatch(setSearch(val))}
          placeholder="Search Users..."
          className="form-control"
        />

        <select
          className="form-control"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
        </select>
      </Form>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Users</h4>

 {loggedInUser?.role === "admin" && (
            <Button
              variant="light"
              className="fw-semibold px-4 py-2 rounded-3"
              onClick={openModal}
            >
              + Add User
            </Button>
          )}


         
          </div>

          <UsersTable
            users={users}
            openModal={openModal}
            showModal={showModal}
          ></UsersTable>

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
