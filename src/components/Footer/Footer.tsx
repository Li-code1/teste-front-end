import logo from '../../assets/img/logo-footer.png';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../Icons';
import './Footer.scss';

const COLUMNS = [
  { title: 'Institucional', links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'] },
  { title: 'Ajuda', links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'] },
  { title: 'Termos', links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="Econverse" width={139} height={42} loading="lazy" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <ul className="footer__social" aria-label="Redes sociais">
            <li><a href="#" aria-label="Instagram"><InstagramIcon width={26} height={26} /></a></li>
            <li><a href="#" aria-label="Facebook"><FacebookIcon width={26} height={26} /></a></li>
            <li><a href="#" aria-label="LinkedIn"><LinkedinIcon width={26} height={26} /></a></li>
          </ul>
        </div>

        <nav className="footer__columns" aria-label="Links do rodapé">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p className="footer__copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </footer>
  );
}
