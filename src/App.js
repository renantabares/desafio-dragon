import { useState } from "react";
import Login from "./components/Login";
import DragonList from "./components/DragonList";

function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <div>
      {isLogged ? (
        <>
          <button onClick={handleLogout}>Sair</button>
          <DragonList />
        </>
      ) : (
        <Login onLogin={() => setIsLogged(true)} />
      )}
    </div>
  );
}

export default App;