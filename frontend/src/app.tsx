import React from "react";
import Game from "./components/game";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", color: "white", backgroundColor: "#000", minHeight: "100vh", padding: "20px" }}>
      <h1>🚀 Asteroid Typing Game</h1>
      <Game />
    </div>
  );
};

export default App;

