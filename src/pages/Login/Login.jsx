import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import data from "../../data/database";

function Login({ show, closeModal }) {
  if (!show) return null;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState(false);
  const cambiarLogin = () => {
    setLogin(!login);
  };

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  let usersJSON = JSON.stringify(data);
  localStorage.setItem("users", usersJSON);
  let users = JSON.parse(localStorage.getItem("users"));

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que se completen los campos
    if (!formValues.email || !formValues.password) {
      alert("Debe completar los campos obligatorios!");
      return;
    }

    const matchedUser = users.find(
      (eachUser) =>
        formValues.email === eachUser.email &&
        formValues.password === eachUser.password
    );

    if (matchedUser) {
      alert("Datos correctos");
      cambiarLogin();
      //   navigate("/"); // Redirigir a la página principal
    } else {
      alert("Email o password incorrecto!");
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="row text-center mb-5 text-dark ">
            <div className="col-sm-12">
              <h2>Iniciar Sesion</h2>
            </div>
            <div className="col">
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column justify-content-center align-items-center bg-dark text-white"
              >
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="usuario@dominio.com"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Contraseña</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="Ingrese aqui"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    {showPassword ? (
                      <i
                        className="bi bi-eye-slash-fill position-absolute showPassword"
                        onClick={() => setShowPassword(!showPassword)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-eye-fill position-absolute showPassword"
                        onClick={() => setShowPassword(!showPassword)}
                      ></i>
                    )}
                  </div>
                </div>
                <div className="mb-3 d-grid">
                  <button className="btn btn-success">Sign in</button>
                </div>
              </form>
            </div>
          </div>
          <button onClick={closeModal} className="btn btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
