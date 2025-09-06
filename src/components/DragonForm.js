import React, { useState } from "react";
import api from "../services/api";

function DragonForm({ existingDragon, onSave }) {
  const [name, setName] = useState(existingDragon?.name || "");
  const [type, setType] = useState(existingDragon?.type || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingDragon) {
        await api.put(`/dragon/${existingDragon.id}`, { name, type });
      } else {
        await api.post("/dragon", { name, type });
      }
      if (onSave) onSave();
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Tipo"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <button type="submit">{existingDragon ? "Editar" : "Criar"}</button>
    </form>
  );
}

export default DragonForm;