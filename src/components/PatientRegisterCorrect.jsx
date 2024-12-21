import React from 'react'
import "./registerCorrect.css";
import { Link } from 'react-router-dom';

function PatientRegisterCorrect( { showModal, closeModal} ) {
    if (!showModal) return null;
  return (
    <>
    <div className="modal-overlay">
        <div className="modal-content">
          <div className="row text-center text-dark modal-bg">
            <h3 className='mt-3'>
              <i className="bi bi-check2-all"></i> REGISTRO EXITOSO
            </h3>
            <div className="modal-footer">
                {/* El boton debe llevar a pagina de inicio */}
                <button
                type='button'
                className='btn btn-primary m-2'
                >Inicio</button>
              <button
                type="button"
                className="btn btn-success m-2"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientRegisterCorrect