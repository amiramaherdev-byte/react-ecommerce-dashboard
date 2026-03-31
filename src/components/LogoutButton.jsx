import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
        <Button
      onClick={handleLogout}
      variant="danger"
      className="d-flex align-items-center gap-1"
    >
      <FiLogOut /> 
      Log out
    </Button>
  );
};

export default LogoutButton;
