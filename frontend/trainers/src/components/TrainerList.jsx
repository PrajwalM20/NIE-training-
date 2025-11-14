import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthToken, deleteTrainer } from "../api";

export const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const filters = {
    name: searchParams.get("name") || "",
    place: searchParams.get("place") || "",
    technology: searchParams.get("technology") || "",
  };

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/trainer/", {
        params: filters,
        headers: AuthToken(),
      });
      setTrainers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, [searchParams]);

  const remove = async (id) => {
    if (!window.confirm("Delete this trainer?")) return;

    try {
      await deleteTrainer(id);
      fetchTrainers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
        marginTop: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "700",
          color: "#0f1a40",
        }}
      >
        Trainer List
      </h2>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          className="table"
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            background: "white",
          }}
        >
          <thead
            style={{
              background: "#0f1a40",
              color: "white",
            }}
          >
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Place</th>
              <th>Tech 1</th>
              <th>Tech 2</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {trainers.length > 0 ? (
              trainers.map((t) => (
                <tr key={t.id} style={{ verticalAlign: "middle" }}>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>
                  <td>{t.place}</td>
                  <td>{t.technology1}</td>
                  <td>{t.technology2}</td>

                  <td>
                    <button
                      className="btn btn-dark btn-sm me-2"
                      onClick={() => setSelectedTrainer(t)}
                      style={{ borderRadius: "6px" }}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      style={{ borderRadius: "6px" }}
                      onClick={() => navigate("/update", { state: t })}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      style={{ borderRadius: "6px" }}
                      onClick={() => remove(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No trainers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Trainer Details Box */}
      {selectedTrainer && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "15px",
            background: "#f2f4ff",
            border: "1px solid #d6dbff",
            boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ marginBottom: "15px", fontWeight: "600" }}>
            Trainer Details
          </h4>

          <p><strong>Name:</strong> {selectedTrainer.name}</p>
          <p><strong>Email:</strong> {selectedTrainer.email}</p>
          <p><strong>Phone:</strong> {selectedTrainer.phone}</p>
          <p><strong>Place:</strong> {selectedTrainer.place}</p>
          <p><strong>Technology 1:</strong> {selectedTrainer.technology1}</p>
          <p><strong>Technology 2:</strong> {selectedTrainer.technology2}</p>

          <button
            className="btn btn-secondary mt-2"
            style={{ borderRadius: "8px" }}
            onClick={() => setSelectedTrainer(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
