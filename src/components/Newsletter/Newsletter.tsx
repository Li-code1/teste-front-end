import { useState, type FormEvent } from 'react';
import './Newsletter.scss';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) return setMessage({ type: 'error', text: 'Informe seu nome.' });
    if (!EMAIL_REGEX.test(email)) return setMessage({ type: 'error', text: 'Informe um e-mail válido.' });
    if (!accepted) return setMessage({ type: 'error', text: 'Aceite os termos e condições para continuar.' });

    setMessage({ type: 'success', text: 'Inscrição realizada com sucesso!' });
    setName('');
    setEmail('');
    setAccepted(false);
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__inner">
        <div className="newsletter__text">
          <h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2>
          <p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p>
        </div>

        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter__fields">
            <label className="visually-hidden" htmlFor="newsletter-name">Nome</label>
            <input
              id="newsletter-name"
              type="text"
              placeholder="Digite seu nome"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="visually-hidden" htmlFor="newsletter-email">E-mail</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Inscrever</button>
          </div>

          <label className="newsletter__terms">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            Aceito os termos e condições
          </label>

          {message && (
            <p className={`newsletter__message newsletter__message--${message.type}`} role="status">
              {message.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
