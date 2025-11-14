import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";
import { Home } from "./components/Home";
import { Search } from "./components/Search";
import { AddTrainers } from "./components/AddTrainers";
import { TrainerList } from "./components/TrainerList";
import { UpdateTrainers } from "./components/UpdateTrainers";
import { Login } from "./components/Login";   // <-- IMPORTANT

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* SHOW SIDEBAR ONLY IF LOGGED IN */}
      {window.location.pathname !== "/login" && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      <div
        style={{
          marginLeft:
            window.location.pathname !== "/login"
              ? collapsed
                ? "70px"
                : "240px"
              : "0px",
          padding: "30px",
          transition: "0.3s",
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />   {/* <-- REQUIRED */}

          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add" element={<AddTrainers />} />
          <Route path="/trainer-list" element={<TrainerList />} />
          <Route path="/update" element={<UpdateTrainers />} />

          <Route path="/" element={<Login />} />  {/* default = login */}
        </Routes>
      </div>
    </>
  );
}

export default App;
