import React, { useEffect, useState } from "react";
import api from "../services/api";
import useDebounce from "../hooks/useDebounce";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const debouncedSearch = useDebounce(search, 500);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let endpoint = "/users";

        if (debouncedSearch) {
          endpoint = `/users/search?q=${debouncedSearch}`;
        }
        const res = await api.get(endpoint);

        setTotalUsers(res.data.users.length);

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedUsers = res.data.users.slice(start, end);

        setUsers(paginatedUsers);
      } catch (error) {
        setErr("failed fetching users");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch, currentPage]);
  useEffect(() => {
    console.log(users);
  }, [users]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return {
    users,
    loading,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    err,
  };
};

export default useUsers;
