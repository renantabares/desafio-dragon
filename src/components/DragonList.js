import { React, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";


function DragonList() {
  const { data: initialDragons, loading, error } = useFetch("/dragon");
  const [dragons, setDragons] = useState([]);

  useEffect(() => {
    if (initialDragons) {
      // Ordena em ordem alfabética pelo nome
      const sorted = [...initialDragons].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setDragons(sorted);
    }
  }, [initialDragons]);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este dragão?")) return;

    try {
      await api.delete(`/dragon/${id}`);
      setDragons(dragons.filter(d => d.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir o dragão.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar: {error.message}</p>;

  return (
    <div>
      <h2>Lista de Dragões</h2>
      <ul>
        {dragons.map((d) => (
          <li key={d.id}>
            <strong>{d.name}</strong> - {d.type}{" "}
            <button onClick={() => handleDelete(d.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragonList;
