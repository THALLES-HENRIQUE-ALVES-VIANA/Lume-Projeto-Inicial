import { useState } from 'react'
import { signup } from './auth'
import './cadastro.css'
import Login from "../login/login";
import { Link } from 'react-router-dom'


function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [data, setData] = useState("");
  const [telefone, setTelefone] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const resultado = await signup(
      nome,
      telefone,
      data,
      email,
      senha
    );

    console.log(resultado);

    if (resultado.success) {
      alert("Cadastro feito com sucesso!");
    } else {
      alert(resultado.error);
    }
  }

  return (
    <div className="container">
      <form className="cadastro-box" onSubmit={handleLogin}>
        <h1>Cadastro</h1>

        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="tel"
          placeholder="(12) 34567-8901"
          value={telefone}
          onChange={(e) => {
            let valor = e.target.value;

            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

            setTelefone(valor);
          }}
        />

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="date"
          placeholder="dd/mm/aaaa"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
        <p className="texto-login">
          Ja criou uma conta?{" "}

          <Link to="/login" className="link-login">
            Clique aqui para voltar para o cadastro
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;


