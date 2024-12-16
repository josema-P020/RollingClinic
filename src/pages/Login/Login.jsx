import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="container-fluid bg-dark text-white">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-md-6">
          <form className="d-flex flex-column justify-content-center align-items-center">
            <div className="mb-3 d-grid">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
              />
            </div>
            <div className="mb-3 d-grid">
              <label htmlFor="password">Contraseña</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  id="password"
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
    </div>
  );
}

export default Login;
