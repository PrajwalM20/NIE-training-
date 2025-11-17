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

const Layout = ({ children }) => (
  <div className="layout-wrapper">
    <Sidebar />
    <div className="content-area">{children}</div>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

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
