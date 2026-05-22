import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './licoes.css';
import plusbtn from '../../assets/plus.svg';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Dialog } from 'primereact/dialog'; 

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

const EMPTY_LESSON= {
  title: '',
  question: '',
  option1: '',
  option2: '',
  option3: '',
};

export default function Licoes() {
  const footer = (
    <div className="flex flex-column align-items-center">
    </div>
  );

  const [visible, setVisible] = React.useState(false);

  function openDialog() {
    setVisible(true);
  } 

  return (
    <div className="sobre flex justify-content-center align-items-center">
        <Card title="Conteúdo das lições" footer={footer}>
            <Button className="btn-add" rounded onClick={openDialog}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white    " stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Adicionar lições
            </Button>
            <Dialog
              visible={visible}
              style={customStyles}
              onHide={setVisible}
            > 
              <div className="dialog-container">
                <div className="dialog-content">
                  <text className="titulo-licao">Lição</text><br /><br />
                  <form className="form-dialog">
                    <label htmlFor="questao">Escreva a questão: </label><br />
                    <input type="text" /><br /><br />

                    <label htmlFor="alternativaA">Insira a alternativa A:</label><br />
                    <input type="text" /><br /><br />

                    <label htmlFor="alternativaB">Insira a alternativa B:</label><br />
                    <input type="text" /><br /><br />

                    <label htmlFor="alternativaC">Insira a alternativa C:</label><br />
                    <input type="text" /><br /><br />

                    <button className="btn-salvar" type="submit">Salvar</button>
                  </form>
                </div>
              </div>
            </Dialog>
        </Card>
    </div>
  );
}

