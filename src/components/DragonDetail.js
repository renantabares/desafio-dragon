import React, { useEffect, useState } from "react";
import api from "../services/api";

function DragonDetail({ id }) {
  const [dragon, setDragon] = useState(null);

  useEffect(() => {
    api.get(`/dragon/${id}`).then((res) => setDragon(res.data));
  }, [id]);

  if (!dragon) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{dragon.name}</h2>
      <p>Tipo: {dragon.type}</p>
      <p>Criado em: {dragon.createdAt}</p>
    </div>
  );
}

export default DragonDetail;