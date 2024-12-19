import React, { useState } from "react";
import Login from "../pages/Login/Login";

function LoginBtn() {
    const [show, setShow] =useState(false);
    const openModal = () => {
        setShow(true)
    };
    const closeModal = () => {
        setShow(false); // Cierra el modal
      };
    console.log(show);
  return (
    <>
    <button type="submit" className="btn btn-primary mx-3" onClick={openModal}>
      Inicia Sesión
    </button>
    <Login show={show} closeModal={closeModal} />
    </>
    
  );
}

export default LoginBtn;
