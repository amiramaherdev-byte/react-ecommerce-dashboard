import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import UserCard from "../../components/users/UserCard";

const UsersDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/users/${id}`);

        setUser(res.data);
      } catch (err) {}
    };

    fetchUsers();
  }, [id]);

  return (
    <div>
      <UserCard user={user} />
    </div>
  );
};

export default UsersDetails;
