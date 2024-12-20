import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import data from "../../data/database";

function Login() {
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


    if(!matchedUser.aprobbed) { 
      alert("Usuario pendiente de aprobación")
      return;
    }

    if (matchedUser) {
      alert("Datos correctos");
      cambiarLogin();
      //   navigate("/"); // Redirigir a la página principal
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      // let users = JSON.parse(localStorage.getItem("users"));
    } else {
      alert("Email o password incorrecto!");
    }



  };

  return (
    <>
    <div className="container-fluid">
    <div className="row d-flex align-items-center justify-content-center min-vh-100">
        <div className="d-none d-md-block col-lg-8 imgLogin">
        </div>
        <div className="col-sm-12 col-lg-4">
          <div className="login-container">
            <div className="row text-center mb-5">
              <div className="col-sm-12">
                <h2>Iniciar Sesion</h2>
              </div>
              <div className="col-sm-12">
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column justify-content-center align-items-center"
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
                    <button className="btn btn-success">Iniciar sesión</button>
                  </div>
                </form>
                <div className="d-flex justify-content-center align-items-center my-3 gap-2">
                  <p className="mt-3">¿Aún no tienes cuenta?</p>

                  <button className="btn btn-primary">Registrate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
}

export default Login;
