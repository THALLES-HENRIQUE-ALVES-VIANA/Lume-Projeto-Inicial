import React from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import profileImage from '../../assets/Logo_sem_titulo.png';

export default function Sobre() {
  const footer = (
    <div className="flex flex-column align-items-center">
      <Avatar image={profileImage} size="xlarge" shape="circle" />
      <span className="mt-3">Grupo Prysmo</span>

      <div className="sobre-footer-actions">
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          <Button label="YouTube" icon="pi pi-youtube" className="p-button-help"/>
        </a>

        <a href="https://pt-br.facebook.com/" target="_blank" rel="noreferrer">
          <Button label="Facebook" icon="pi pi-facebook" className="p-button-help"/>
        </a>
      </div>
    </div>
  );

  return (
    <div className="sobre flex justify-content-center align-items-center">
      <Card
        title="Grupo Prysmo"
        footer={footer}
      >
        <section>
          <h2>Visao Geral</h2>
          <p>
            O grupo é composto por <b>Agatha Liz, Isabela Santiago, Thalles Henrique, Júlia Rodrigues e Yasmin de Jesus</b>. Todos cursando o técnico de desenvolvimento de sistemas no último ano.
          </p>
        </section>

        <section>
          <h2>Tecnologias Utilizadas</h2>
          <ul>
            <li>React.Native</li>
            <li>Mysql e PHP</li>
            <li>Trello e notion</li>
          </ul>
        </section>

        <section>
          <h2>Funcionalidades Principais</h2>
          <p>O aplicativo surgiu da realidade enfrentada pelos os idosos no dia a dia, que cada vez mais tecnológica transforma tarefas básicas, antes feitas de maneira fisica para o ambiente digital, tornando esse grupo que muitas vezes sente dificuldade com essas aplicações a serem inseridos na sociedade.</p>
        </section>
      </Card>
    </div>
  );
}
