import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { FiLogOut } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = ({ collapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className={`mt-auto pt-4 ${
        collapsed ? "d-flex justify-content-center" : ""
      }`}
    >
      <Button
        variant="danger"
        onClick={handleLogout}
        className={`d-flex align-items-center border-0 rounded-3 px-3 py-2 w-100 ${
          collapsed ? "justify-content-center w-auto" : "gap-2"
        }`}
      >
        <FaSignOutAlt />

        {!collapsed && "Logout"}
      </Button>
    </div>
  );
};

export default LogoutButton;
