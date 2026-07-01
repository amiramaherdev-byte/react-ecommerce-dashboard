import UserCard from "../../components/Users/UserCard";

const UserDetails = ({ user }) => {
  if (!user) return <p>No user selected</p>;

  return <UserCard user={user} />;
};

export default UserDetails;