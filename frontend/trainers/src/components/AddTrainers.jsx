import React, { useState } from "react";
import { addtrainer } from "../api";
import { useNavigate } from "react-router-dom";

export const AddTrainers = () => {
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    technology1: "",
    technology2: "",
  });

  const handleChange = (e) => {
    setTrainer({ ...trainer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addtrainer(trainer);
      alert("Trainer added!");
      navigate("/trainer-list");
    } catch (err) {
      console.error(err);
      alert("Error adding trainer");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-3">Add Trainer</h2>

      <form className="p-4 shadow rounded" onSubmit={handleSubmit}>
        
        <input className="form-control mb-3" name="name" placeholder="Name" value={trainer.name} onChange={handleChange} required />

        <input className="form-control mb-3" name="email" placeholder="Email" value={trainer.email} onChange={handleChange} required />

        <input className="form-control mb-3" name="phone" placeholder="Phone Number" value={trainer.phone} onChange={handleChange} required />

        <input className="form-control mb-3" name="place" placeholder="Place" value={trainer.place} onChange={handleChange} required />

        <input className="form-control mb-3" name="technology1" placeholder="Technology 1" value={trainer.technology1} onChange={handleChange} required />

        <input className="form-control mb-3" name="technology2" placeholder="Technology 2" value={trainer.technology2} onChange={handleChange} />

        <button className="btn btn-dark w-100">Add Trainer</button>
      </form>
    </div>
  );
};
