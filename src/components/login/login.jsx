  import React, { useEffect, useMemo, useState } from 'react';
  import { Button } from 'primereact/button';
  import { Card } from 'primereact/card';
  import { Checkbox } from 'primereact/checkbox';
  import { InputText } from 'primereact/inputtext';
  import { Link, useLocation, useNavigate } from 'react-router-dom';
  import Cookies from 'js-cookie';
  import { ROUTES, STORAGE_KEYS } from '../../constants/app-config';
  import { persistUsername } from '../../utils/session';
  import './login.css';
  import { entrar } from "./auth.js"

  export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [rememberMe, setRememberMe] = useState(
      Boolean(Cookies.get(STORAGE_KEYS.username))
    );

    const [errorMessage, setErrorMessage] = useState('');
    const destination = useMemo(() => {

      if (location.state?.from && location.state.from !== ROUTES.login) {
        return location.state.from;
      }

      return ROUTES.partners;
    }, [location.state]);

    useEffect(() => {
      document.body.classList.add('login-page');

      return () => {
        document.body.classList.remove('login-page');
      };

    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const persistedUsername = persistUsername(username, rememberMe);
    if (!persistedUsername) {
      setErrorMessage('Informe um usuário para continuar.');
      return;
    }

    try {
      const result = await entrar(email, senha);

      if (result.success) {
        localStorage.setItem('usuario', JSON.stringify(result.user));
        setSenha('');
        
        navigate(destination, { replace: true });
      } else {
        setErrorMessage(result.error || 'Erro ao realizar login.');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro na comunicação com o servidor.');
    }
  };

    return (
      <div className="login-screen">
        <Card title="Login" className="login-card">
          <form className="p-fluid login-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="username">Usuario</label>
              <InputText
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                className={errorMessage ? 'p-invalid' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />

            </div>
            <div className="field">
              <label htmlFor="senha">Senha</label>
              <InputText
                id="senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                autoComplete="current-password"
              />

            </div>
            <div className="field-checkbox">
              <Checkbox
                inputId="rememberMe"
                checked={rememberMe}
                onChange={(event) => setRememberMe(Boolean(event.checked))}
              />

              <label htmlFor="rememberMe">
                Manter Conectado
              </label>
            </div>

            {errorMessage && (
              <small className="login-error">
                {errorMessage}
              </small>
            )}

            <Button type="submit" label="Entrar" className="btn-entrar"
            />

          </form>
          <p className="texto-cadastro">
            Não tem conta?{" "}
            <Link to="/cadastro" className="link-cadastro">
              Clique aqui para se cadastrar
            </Link>
          </p>

        </Card>
      </div>
    );
  }