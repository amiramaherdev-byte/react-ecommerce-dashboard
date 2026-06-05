import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { Pencil, Trash, Eye, ThreeDotsVertical } from "react-bootstrap-icons";

import { fetchAllCarts } from "../../features/carts/cartThunk";
import {
  fetchProducts,
  getCategories,
} from "../../features/products/productsSlice";
import { fetchUsers } from "../../features/users/usersThunks";

import { Link } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatsCards from "../../components/Dashboard/StatsCards";
import useDashboardData from "../../hooks/useDashboardData";
import UsersTable from "../../components/Users/UsersTable";
import UserForm from "../../components/Users/UserForm";
import CustomModal from "../../components/UI/CustomModal";

const Dashboard = () => {
  const { stats, latestUsers, productsPerCategory, users } = useDashboardData();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const openModal = (user = null) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="container-fluid">
      <DashboardHeader />

      {/* Stats Cards */}

      <StatsCards stats={stats} />

      {/* Latest Users */}

      <UsersTable openModal={openModal} latestUsers={latestUsers}></UsersTable>

      {/* Modal for Add/Edit */}
      <CustomModal
        show={showModal}
        handleClose={closeModal}
        title={selectedUser ? "Edit User" : "Add User"}
      >
        <UserForm user={selectedUser}  closeModal={closeModal} dispatch={dispatch} />
      </CustomModal>
    </div>
  );
};

export default Dashboard;
