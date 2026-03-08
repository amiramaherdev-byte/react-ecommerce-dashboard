import { Card, Button } from "react-bootstrap";

const UserCard = ({ user }) => {
  return (
    <Card style={{ width: "22rem", margin: "auto" }} className="shadow-sm">
      <Card.Body className="text-center">

        <img
          src={`https://i.pravatar.cc/150?img=${user?.id}`}
          alt="avatar"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            marginBottom: "15px",
          }}
        />

        <Card.Title>{user?.firstName}</Card.Title>
        <Card.Text className="text-muted">{user?.email}</Card.Text>

        <div className="mb-3">
          <strong>Role:</strong> {user?.role}
        </div>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="outline-primary" size="sm">
            Edit
          </Button>

          <Button variant="outline-danger" size="sm">
            Delete
          </Button>
        </div>

      </Card.Body>
    </Card>
  );
};

export default UserCard;