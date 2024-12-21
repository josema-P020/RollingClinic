import React, { useState } from "react";
import "./register.css";
import data from "../../data/database";
import PatientRegisterCorrect from "../../components/PatientRegisterCorrect";

function RegisterPatient() {
  let usersJSON = JSON.stringify(data);
  localStorage.setItem("users", usersJSON);
  let users = JSON.parse(localStorage.getItem("users"));

  const [isAccepted, setIsAccepted] = useState(false);

  const handleCheckboxClick = () => {
    setIsAccepted(!isAccepted);
  };

  console.log(isAccepted);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal
  };

  const year = new Date().getFullYear() - 18;

  const month = new Date().getMonth() + 1;

  const day = new Date().getDate();

  const maxDate = year + "-" + month + "-" + day;
  console.log(maxDate);

  const [formValues, setFormValues] = useState({
    name: "",
    tel: "",
    dateBirth: "",
    city: "",
    dni: "",
    genre: "",
    obraSocial: "",
    email: "",
    password: "",
    passwordrepeat: "",
    id: new Date().getTime(),
    role: "PACIENTE",
    aprobbed: true,
    turnos: [""],
  });

  console.log(formValues);

  const [showPassword, setShowPassword] = useState(false);

  const showPwd = () => {
    setShowPassword(!showPassword);
  };

  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  const showRepeatedPwd = () => {
    setShowRepeatedPassword(!showRepeatedPassword);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formValues.email ||
      !formValues.password ||
      !formValues.passwordrepeat ||
      !formValues.dateBirth ||
      !formValues.dni ||
      !formValues.tel ||
      !formValues.name ||
      !formValues.obraSocial ||
      !formValues.city ||
      !formValues.genre
    ) {
      alert("Debe completar todos los campos");
      return;
    }

    if (formValues.password !== formValues.passwordrepeat) {
      alert("Las contraseñas deben coincidir!");
      return;
    }

    if (!isAccepted) {
      alert("Debe aceptar los Términos y Condiciones para registrarse.");
      return;
    }

    const emailExists = users.find((user) => user.email === formValues.email);

    if (emailExists) {
      alert("Este correo ya está registrado. Por favor, usa otro.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

    if (!passwordRegex.test(formValues.password)) {
      alert(
        "La contraseña debe tener mínimo 6 caracteres, maximo 20, incluyendo mayúscula, minúscula, número y carácter especial"
      );
      return;
    }

    if (!passwordRegex.test(formValues.password)) {
      alert(
        "La contraseña debe tener mínimo 6 caracteres, maximo 20, incluyendo mayúscula, minúscula, número y carácter especial"
      );
      return;
    }

    const newUser = {
      name: formValues.name,
      tel: parseInt(formValues.tel),
      dateBirth: formValues.dateBirth,
      city: formValues.city,
      dni: parseInt(formValues.dni),
      genre: formValues.genre,
      obraSocial: formValues.obraSocial,
      email: formValues.email,
      password: formValues.password,
      role: formValues.role,
      aprobbed: formValues.aprobbed,
      turnos: formValues.turnos,
      id: formValues.id,
    };

    data.push(newUser);
    usersJSON = JSON.stringify(data);
    localStorage.setItem("users", usersJSON);
    users = JSON.parse(localStorage.getItem("users"));

    openModal();

    setFormValues({
      name: "",
      tel: "",
      dateBirth: "",
      city: "",
      dni: "",
      obraSocial: "",
      genre: "",
      email: "",
      password: "",
      passwordrepeat: "",
      id: new Date().getTime(),
      role: "PACIENTE",
      turnos: [""],
    });
  };
  return (
    <>
      <div className="container bg-form">
        {/* <div className="row">
          <div className="col-12">
          </div>
        </div> */}
        <h3 className="text-center mt-5">
          Registrate para comenzar a pedir turno
        </h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <label htmlFor="name" className="mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="name"
                name="name"
                placeholder="Giancarlo Esposito"
                required
                onChange={handleChange}
                value={formValues.name}
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="tel" className="mb-1">
                Teléfono
              </label>
              <input
                type="phone"
                className="form-control mb-3"
                id="tel"
                name="tel"
                placeholder="3816093788"
                required
                onChange={handleChange}
                value={formValues.tel}
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="date" className="mb-1">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                className="form-control mb-1"
                id="date"
                name="dateBirth"
                min="1930-01-01"
                max={maxDate}
                value={formValues.dateBirth}
                onChange={handleChange}
              />
              <p className="text-muted mb-3">
                Debes ser mayor de 18 años para registrarte como paciente.
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="city" className="mb-1">
                Elige tu ciudad
              </label>
              <select
                className="form-control mb-3"
                name="city"
                id="city"
                required
                onChange={handleChange}
                value={formValues.city}
              >
                <option value="" disabled>
                  -- Elegir una opción --
                </option>
                <option value="San Miguel de Tucuman">
                  San Miguel de Tucuman
                </option>
                <option value="Tafi Viejo">Tafi Viejo</option>
                <option value="Monteros">Monteros</option>
                <option value="Lules">Lules</option>
                <option value="Las Talitas">Las Talitas</option>
                <option value="Yerba Buena">Yerba Buena</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="dni" className="mb-1">
                DNI
              </label>
              <input
                type="number"
                className="form-control mb-3"
                id="dni"
                name="dni"
                placeholder="18016723"
                required
                value={formValues.dni}
                onChange={handleChange}
              />
            </div>

            <div className="col-sm-12 col-md-6">
              <label htmlFor="obraSocial" className="mb-1">
                ¿Tienes obra social?
              </label>
              <select
                className="form-control mb-3"
                name="obraSocial"
                id="obraSocial"
                value={formValues.obraSocial}
                onChange={handleChange}
              >
                <option value="" disabled>
                  -- Elegir una opción --
                </option>
                <option value="OSDE">OSDE</option>
                <option value="SWISS MEDICAL">SWISS MEDICAL</option>
                <option value="PRENSA">PRENSA</option>
                <option value="SUBSIDIO">SUBSIDIO</option>
                <option value="PAMI">PAMI</option>
                <option value="OSECAC">OSECAC</option>
                <option value="PARTICULAR">
                  No tengo obra social (particular)
                </option>
              </select>
            </div>

            <div className="col-sm-12 col-md-6">
              <label htmlFor="email" className="mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control mb-3"
                id="email"
                name="email"
                placeholder="usuario@outlook.com"
                required
                value={formValues.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-sm-12 col-md-6">
              <label htmlFor="genre" className="mb-1">
                Sexo
              </label>
              <select
                className="form-control mb-3"
                name="genre"
                id="genre"
                value={formValues.genre}
                onChange={handleChange}
              >
                <option value="" disabled>
                  -- Elegir una opción --
                </option>
                <option value="female">Mujer</option>
                <option value="male">Varon</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div className="col-sm-12 col-md-6">
              <label htmlFor="password" className="mb-1">
                Contraseña
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-1"
                  name="password"
                  id="password"
                  placeholder="Ingrese aquí su contraseña"
                  required
                  value={formValues.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <i
                    className="bi bi-eye-fill position-absolute showPwd"
                    onClick={showPwd}
                  ></i>
                ) : (
                  <i
                    className="bi bi-eye-slash-fill position-absolute showPwd"
                    onClick={showPwd}
                  ></i>
                )}
              </div>
              <p className="text-muted mb-3">
                Mínimo 6 caracteres, incluyendo mayúscula, minúscula, número y
                carácter especial.
              </p>
            </div>

            <div className="col-sm-12 col-md-6">
              <label htmlFor="repeatedpassword" className="mb-1">
                Repita su contraseña
              </label>
              <div className="position-relative">
                <input
                  type={showRepeatedPassword ? "text" : "password"}
                  className="form-control mb-3"
                  name="passwordrepeat"
                  id="repeatedpassword"
                  placeholder="Ingrese aquí su contraseña nuevamente"
                  required
                  value={formValues.passwordrepeat}
                  onChange={handleChange}
                />
                {showRepeatedPassword ? (
                  <i
                    className="bi bi-eye-fill position-absolute showPwd"
                    onClick={showRepeatedPwd}
                  ></i>
                ) : (
                  <i
                    className="bi bi-eye-slash-fill position-absolute showPwd"
                    onClick={showRepeatedPwd}
                  ></i>
                )}
              </div>
            </div>
          </div>

          <div className="my-3 d-flex justify-content-center">
            {/* <input
              className="mb-2"
              type="checkbox"
              onChange={handleCheckboxClick}
              required
            /> */}
            {/* esto debe mandar al error 404 */}

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id=""
                required
                onChange={handleCheckboxClick}
              />
            </div>

            <p>
              Acepto los <strong>Terminos y Condiciones</strong>
            </p>
          </div>

          <div className="mb-3 d-grid">
            <button type="submit" className="btn btn-success">
              Registrarse
            </button>
          </div>
        </form>
        <div className="mb-3 d-grid text-center d-flex justify-content-center align-items-center">
          <p className="mx-3 pt-3">¿Ya tienes una cuenta?</p>
          {/* falta agregar funcionalidad al boton para que lleve a iniciar sesion */}
          <button type="submit" className="btn btn-primary mx-3">
            Inicia sesion
          </button>
        </div>
        <div className="mb-3 d-grid text-center">
          <p>¿Sos Profesional de Salud? Registrate <a href="/registerDoctor">acá</a> para trabajar con nosotros</p>
        </div>
      </div>
      <PatientRegisterCorrect showModal={showModal} closeModal={closeModal} />
    </>
  );
}

export default RegisterPatient;
