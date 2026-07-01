import { Button } from "react-bootstrap";

const SidebarButton = ({
  title,
  icon,
  onClick,
  variant = "primary",
  collapsed,
}) => {
  return (
    <div
      className={`mt-auto pt-4 ${
        collapsed ? "d-flex justify-content-center" : ""
      }`}
    >
      <Button
        variant={variant}
        onClick={onClick}
        className={`d-flex align-items-center border-0 rounded-3 px-3 py-2 w-100 ${
          collapsed ? "justify-content-center w-auto" : "gap-2"
        }`}
      >
        {icon}
        {!collapsed && title}
      </Button>
    </div>
  );
};

export default SidebarButton;
