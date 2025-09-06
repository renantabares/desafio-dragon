import React, { useState } from "react";
import DragonList from "./components/DragonList";
import DragonForm from "./components/DragonForm";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div id="index" style={{ padding: "20px" }}>
      <h1>Gerenciamento de Dragões 🐉</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Fechar Formulário" : "Novo Dragão"}
      </button>
      {showForm && <DragonForm onSave={() => window.location.reload()} />}
      <DragonList />
    </div>
  );
}

export default App;
