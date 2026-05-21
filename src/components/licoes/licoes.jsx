import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './licoes.css';
import plusbtn from '../../assets/plus.svg';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Licoes() {
  const footer = (
    <div className="flex flex-column align-items-center">
    </div>
  );

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="sobre flex justify-content-center align-items-center">
        <Card title="Conteúdo das lições" footer={footer}>
            <Button className="btn-add" rounded onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white    " stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </Button>
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
            >
              <div className="modal-container">
                <button className="btn-close-modal" onClick={closeModal} rounded>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>  
                  </button> 
                <div className="content">
                  <text className="titulo-licao">Lição</text><br /><br />
                  <form className="form-modal">
                    <label htmlFor="questao">Escreva a questão: </label><br />
                    <input type="text" /><br /><br />

                    <label htmlFor="alternativaA">Insira a alternativa A:</label><br />
                    <input type="text" /><br /><br />

                    <label htmlFor="alternativaB">Insira a alternativa B:</label><br />
                    <input type="text" /><br /><br />

                    <label htmlFor="alternativaC">Insira a alternativa C:</label><br />
                    <input type="text" /><br /><br />
                  </form>
                  <button className="btn-salvar">Salvar</button>
                </div>
              </div>
            </Modal>
        </Card>
    </div>
  );
}

