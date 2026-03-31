import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateUser } from "../../features/users/usersThunks";
import { toast } from "react-toastify";
import { addLocalUser, updateLocalUser } from "../../features/users/usersSlice";
const UserForm = ({ user, closeModal, dispatch }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    age: user?.age || "",
    role: user?.role || "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      age: formData.age,
      role: formData.role,
    };

    try {
      if (user) {
        if (user.isLocal) {
          dispatch(updateLocalUser({ id: user.id, data: userData }));
          toast.success("User updated locally");
        } else {
          await dispatch(updateUser({ id: user.id, data: userData })).unwrap();
          toast.success("User updated successfully");
        }
      } else {
        dispatch(addLocalUser(userData));
        toast.success("User added locally");
      }

      closeModal();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </Form.Select>
      </Form.Group>

      <div className="text-end">
        <Button variant="secondary" onClick={closeModal} className="me-2">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {user ? "Update" : "Add"}
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
