import { useState } from 'react';
import tecnologia from '../../assets/img/cat-tecnologia.png';
import supermercado from '../../assets/img/cat-supermercado.png';
import bebidas from '../../assets/img/cat-bebidas.png';
import ferramentas from '../../assets/img/cat-ferramentas.png';
import saude from '../../assets/img/cat-saude.png';
import esportes from '../../assets/img/cat-esportes.png';
import moda from '../../assets/img/cat-moda.png';
import './Categories.scss';

const CATEGORIES = [
  { name: 'Tecnologia', icon: tecnologia },
  { name: 'Supermercado', icon: supermercado },
  { name: 'Bebidas', icon: bebidas },
  { name: 'Ferramentas', icon: ferramentas },
  { name: 'Saúde', icon: saude },
  { name: 'Esportes e Fitness', icon: esportes },
  { name: 'Moda', icon: moda },
];

export default function Categories() {
  const [active, setActive] = useState('Tecnologia');

  return (
    <nav className="categories" aria-label="Categorias de produtos">
      <ul className="categories__list">
        {CATEGORIES.map(({ name, icon }) => (
          <li key={name}>
            <button
              type="button"
              className={`categories__item${active === name ? ' is-active' : ''}`}
              aria-pressed={active === name}
              onClick={() => setActive(name)}
            >
              <span className="categories__icon">
                <img src={icon} alt="" width={64} height={64} />
              </span>
              <span className="categories__label">{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
