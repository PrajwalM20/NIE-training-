import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { updateTrainer, getTrainer } from "../api";

export const UpdateTrainers = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();

  const idFromQuery = searchParams.get("id");

  const [loading, setLoading] = useState(true);

  const [trainer, setTrainer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    place: "",
    technology1: "",
    technology2: "",
  });

  // LOAD TRAINER DATA
  useEffect(() => {
    const load = async () => {
      try {
        if (state?.id) {
          setTrainer(state);
        } else if (idFromQuery) {
          const data = await getTrainer(idFromQuery);
          setTrainer(data);
        } else {
          navigate("/trainer-list");
          return;
        }
      } catch (err) {
        console.error(err);
        navigate("/trainer-list");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [state, idFromQuery, navigate]);

  const change = (e) => {
    setTrainer({ ...trainer, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await updateTrainer(trainer.id, trainer);
      alert("Trainer updated!");
      navigate("/trainer-list");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // Show loader instead of black screen
  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading trainer data...</h4>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        padding: "30px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{ fontWeight: "700", color: "#0f1a40" }}
      >
        Update Trainer
      </h2>

      <form onSubmit={submit}>
        <label className="fw-bold">Name</label>
        <input
          className="form-control mb-3"
          name="name"
          value={trainer.name}
          onChange={change}
          required
        />

        <label className="fw-bold">Email</label>
        <input
          className="form-control mb-3"
          name="email"
          value={trainer.email}
          onChange={change}
          required
        />

        <label className="fw-bold">Phone</label>
        <input
          className="form-control mb-3"
          name="phone"
          value={trainer.phone}
          onChange={change}
          required
        />

        <label className="fw-bold">Place</label>
        <input
          className="form-control mb-3"
          name="place"
          value={trainer.place}
          onChange={change}
          required
        />

        <label className="fw-bold">Technology 1</label>
        <input
          className="form-control mb-3"
          name="technology1"
          value={trainer.technology1}
          onChange={change}
          required
        />

        <label className="fw-bold">Technology 2</label>
        <input
          className="form-control mb-3"
          name="technology2"
          value={trainer.technology2}
          onChange={change}
        />

        <button className="btn btn-primary w-100 mt-3" style={{ padding: "12px" }}>
          Update Trainer
        </button>
      </form>
    </div>
  );
};
