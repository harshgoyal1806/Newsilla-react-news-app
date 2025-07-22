import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import NotFound from "./Components/NotFound";
import "./App.css";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const config = {
    country: "us",
    pageSize: 9,
  };
  return (
    <BrowserRouter>
      <Navbar />
       <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        {categories.map((cat) => (
          <Route key={cat} path={cat === "general" ? "/" : `/${cat}`} element={<News country={config.country} pageSize={config.pageSize} category={cat} setProgress={setProgress} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
