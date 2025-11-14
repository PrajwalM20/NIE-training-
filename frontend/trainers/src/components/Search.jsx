import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    name: "",
    place: "",
    technology: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const query = new URLSearchParams(filters).toString();
    navigate(`/trainer-list?${query}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Search Trainers</h2>

      <form
        onSubmit={handleSearch}
        className="p-3 rounded shadow"
        style={{ maxWidth: "450px", margin: "auto" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Trainer Name"
          className="form-control mb-3"
          value={filters.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="place"
          placeholder="Place"
          className="form-control mb-3"
          value={filters.place}
          onChange={handleChange}
        />

        <input
          type="text"
          name="technology"
          placeholder="Technology"
          className="form-control mb-3"
          value={filters.technology}
          onChange={handleChange}
        />

        <button className="btn btn-dark w-100">Search</button>
      </form>
    </div>
  );
};
