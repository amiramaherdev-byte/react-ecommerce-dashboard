import CustomModal from "../UI/CustomModal";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";

const UserModal = ({
  show,
  handleClose,
  modalType,
  selectedUser,
  dispatch,
}) => {
  return (
    <CustomModal
      show={show}
      handleClose={handleClose}
      title={
        modalType === "add"
          ? "Add User"
          : modalType === "edit"
            ? "Edit User"
            : "User Details"
      }
    >
      {modalType === "view" ? (
        <UserDetails user={selectedUser} />
      ) : (
        <UserForm
          user={selectedUser}
          closeModal={handleClose}
          dispatch={dispatch}
        />
      )}
    </CustomModal>
  );
};

export default UserModal;
