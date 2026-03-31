import React from "react";
import { Card } from "react-bootstrap";

const UserCard = ({ user }) => {
  return (
    <Card className="shadow-sm border-0">
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
        <div className="mb-2">
          <strong>Role:</strong> {user?.role}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;