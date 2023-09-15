import React from "react";
import ReactDOM from "react-dom/client";
import "../src/css/tailwind.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { MasterLayout } from "./layout/MasterLayOut";
import Music from "./components/Music";
import Menubar from "./components/Menubar";
import PlayList from "./components/PlayList";
import { Album } from "./components/Album";
import { Playlist1 } from "./components/Playlist1";

import Search from "./components/Search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<Music />} />
          <Route path="/album" element={<Album />} />
          <Route path="/albums/:id" element={<Menubar />} />
          <Route path="/playlist" element={<Playlist1 />} />
          <Route path="/playlist/:id" element={<PlayList />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
