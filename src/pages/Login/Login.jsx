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

  const matchedUser = users.find(
    (eachUser) =>
      formValues.email === eachUser.email &&
      formValues.password === eachUser.password,
  );
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validar que se completen los campos
    if (!formValues.email || !formValues.password) {
      alert("Debe completar los campos obligatorios!");
      return;
    }
  
    if (matchedUser) {
      if (!matchedUser.aprobbed) {
        alert("Usuario pendiente de aprobación");
        return;
      }
  
      alert("Datos correctos");
      cambiarLogin();
        navigate("/"); // Redirigir a la página principal
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
  
    } else {
      alert("Email o password incorrecto!");
    }
  };
  

  return (
    <>
      <div className="container-fluid imgContainer text-white">
        <div className="row d-flex align-items-center justify-content-center min-vh-100">
          <div className="col-sm-12 col-md-7 col-lg-9">
            <div className="login-container">
              <div className="row text-center mb-5">
                <div className="col-sm-12 mt-3">
                  <h2>Iniciar Sesion</h2>
                </div>
                <div className="col-sm-12">
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <div className="mb-3">
                      <label htmlFor="email" className="mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="ejemplo@gmail.com"
                        value={formValues.email}
                        onChange={handleChange}
                        autoComplete="username"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="mb-1">
                        Contraseña
                      </label>
                      <div className="position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Ingrese aqui"
                          value={formValues.password}
                          onChange={handleChange}
                          autoComplete="current-password"
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
                      <button className="btn btn-success">
                        Iniciar sesión
                      </button>
                    </div>
                  </form>
                  <div className="dropdow">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Registrate
                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-dark"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <a
                            className="dropdown-item"
                            href="/registerPatient"
                            target="_blank"
                          >Paciente
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/registerDoctor"
                            target="_blank"
                          >
                            Profesional de Salud
                          </a>
                        </li>
                      </ul>
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
