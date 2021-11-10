import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-4">
      <h1>404 - Pagina não encontrada!</h1>
      <Link to="/">Ir para pagina inicial</Link>
    </div>
  );
};

export default NotFound;
