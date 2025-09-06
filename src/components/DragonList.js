import { React, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";

function DragonList() {
  const { data: initialDragons, loading, error } = useFetch("/dragon");
  const [dragons, setDragons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [detailsId, setDetailsId] = useState(null); 
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");

  useEffect(() => {
    if (initialDragons) {
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
      setDragons(dragons.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir o dragão.");
    }
  };

 
  const startEdit = (dragon) => {
    setEditingId(dragon.id);
    setEditName(dragon.name);
    setEditType(dragon.type);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditType("");
  };

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/dragon/${id}`, {
        name: editName,
        type: editType,
      });
      setDragons(dragons.map(d => d.id === id ? res.data : d));
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o dragão.");
    }
  };


  const toggleDetails = (id) => {
    setDetailsId(detailsId === id ? null : id); 
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar: {error.message}</p>;

  return (
    <div>
      <h2>Lista de Dragões</h2>
      <ul>
        {dragons.map((d) => (
          <li key={d.id} style={{ marginBottom: "1rem" }}>
            {editingId === d.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                />
                <button onClick={() => saveEdit(d.id)}>Salvar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{d.name}</strong> - {d.type}{" "}
                <button onClick={() => startEdit(d)}>Editar</button>
                <button onClick={() => handleDelete(d.id)}>Excluir</button>
                <button onClick={() => toggleDetails(d.id)}>
                  {detailsId === d.id ? "Fechar Detalhes" : "Ver Detalhes"}
                </button>
                {detailsId === d.id && (
                  <div style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
                    <p><strong>ID:</strong> {d.id}</p>
                    <p><strong>Criado em:</strong> {new Date(d.createdAt).toLocaleString()}</p>
                    <p><strong>Histórias:</strong> {d.histories.length === 0 ? "Nenhuma" : d.histories.join(", ")}</p>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragonList;