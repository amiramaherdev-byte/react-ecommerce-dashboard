import { useState } from "react";

const useUserModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState("add");

  const openAddModal = () => {
    setSelectedUser(null);
    setModalType("add");
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setModalType("edit");
    setShowModal(true);
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setModalType("view");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return {
    showModal,
    selectedUser,
    modalType,
    openAddModal,
    openEditModal,
    openViewModal,
    closeModal,
  };
};

export default useUserModal;