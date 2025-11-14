import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import AddTrainers from "./components/AddTrainers";
import Search from "./components/Search";
import TrainerList from "./components/TrainerList";
import UpdateTrainers from "./components/UpdateTrainers";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

export default function App() {
  const Layout = ({ children }) => (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6fa" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "28px",
        }}
      >
        {children}
      </main>
    </div>
  );

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Layout>
              <Search />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <Layout>
              <AddTrainers />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer-list"
        element={
          <ProtectedRoute>
            <Layout>
              <TrainerList />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/update"
        element={
          <ProtectedRoute>
            <Layout>
              <UpdateTrainers />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
