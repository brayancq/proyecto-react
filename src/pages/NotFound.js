import React from "react";
import imagenNotFound from "../images/notFound.svg";
import imagen500 from "../images/logo500.svg";
import "./styles/Home.css";
function NotFound(error) {
  debugger;
  return (
    <React.Fragment>
      <div className="contNotFound">
        {error.mensaje.message === "404" ? (
          <img
            className="imagenNotFound"
            src={imagenNotFound}
            alt="no encontrado"
          />
        ) : (
          <img className="imagenNotFound" src={imagen500} alt="error 500" />
        )}
      </div>
    </React.Fragment>
  );
}

export default NotFound;
