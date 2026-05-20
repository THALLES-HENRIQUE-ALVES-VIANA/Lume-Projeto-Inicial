import React from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import profileImage from '../../assets/Logo_sem_titulo.png';

export default function Licoes() {
  const footer = (
    <div className="flex flex-column align-items-center">
      
    </div>
  );

  return (
    <div className="sobre flex justify-content-center align-items-center">
      <Card
        title="Lições"
        footer={footer}
      >
        
      </Card>
    </div>
  );
}
