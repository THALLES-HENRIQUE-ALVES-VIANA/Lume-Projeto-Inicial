import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './licoes.css';
import plusbtn from '../../assets/plus.svg';

export default function Licoes() {
  const footer = (
    <div className="flex flex-column align-items-center">
    </div>
  );

  return (
    <div className="sobre flex justify-content-center align-items-center">
        <Card title="Lições" footer={footer}>
            <Button className="btn-add" rounded>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white    " stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </Button>
        </Card>
    </div>
  );
}
