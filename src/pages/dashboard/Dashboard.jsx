import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
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
import useUserModal from "../../hooks/useUserModal";
import UserModal from "../../components/Users/UserModal";

const Dashboard = () => {
  const { stats, latestUsers, users } = useDashboardData();

  const dispatch = useDispatch();


  
  const {
    showModal,
    selectedUser,
    modalType,
    openAddModal,
    openEditModal,
    openViewModal,
    closeModal,
  } = useUserModal();
  return (
    <div className="container-fluid">
      <DashboardHeader />

      {/* Stats Cards */}

      <StatsCards stats={stats} />

      {/* Latest Users */}

      <UsersTable
        openViewModal={openViewModal}
        openEditModal={openEditModal}
        latestUsers={latestUsers}
      ></UsersTable>

  <UserModal
  show={showModal}
  handleClose={closeModal}
  modalType={modalType}
  selectedUser={selectedUser}
  dispatch={dispatch}
/>
    </div>
  );
};

export default Dashboard;
