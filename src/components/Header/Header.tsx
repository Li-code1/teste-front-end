import logo from '../../assets/img/logo.png';
import {
  CardIcon, CartIcon, CrownIcon, HeartIcon, OrdersIcon, SearchIcon, ShieldIcon, TruckIcon, UserIcon,
} from '../Icons';
import './Header.scss';

// Só "Ofertas do dia" tem destino na página; os demais são botões, pois o teste não traz essas telas.
const NAV_ITEMS = [
  { label: 'Todas categorias' },
  { label: 'Supermercado' },
  { label: 'Livros' },
  { label: 'Moda' },
  { label: 'Lançamentos' },
  { label: 'Ofertas do dia', highlight: true, href: '#produtos' },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <ul className="header__benefits">
          <li><ShieldIcon width={18} height={18} /> <span>Compra <strong>100% segura</strong></span></li>
          <li><TruckIcon width={18} height={18} /> <span><strong>Frete grátis</strong> acima de R$ 200</span></li>
          <li><CardIcon width={18} height={18} /> <span><strong>Parcele</strong> suas compras</span></li>
        </ul>

        <div className="header__main">
          <a href="/" className="header__logo" aria-label="Econverse - página inicial">
            <img src={logo} alt="Econverse" width={139} height={42} />
          </a>

          <form className="header__search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search" className="visually-hidden">Buscar produtos</label>
            <input id="search" type="search" placeholder="O que você está buscando?" />
            <button type="submit" aria-label="Buscar"><SearchIcon width={26} height={26} /></button>
          </form>

          <div className="header__actions">
            <button aria-label="Meus pedidos"><OrdersIcon width={30} height={30} /></button>
            <button aria-label="Favoritos"><HeartIcon width={30} height={30} /></button>
            <button aria-label="Minha conta"><UserIcon width={30} height={30} /></button>
            <button aria-label="Carrinho"><CartIcon width={30} height={30} /></button>
          </div>
        </div>

        <nav className="header__nav" aria-label="Categorias principais">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} className={item.highlight ? 'is-highlight' : undefined}>{item.label}</a>
                ) : (
                  <button type="button">{item.label}</button>
                )}
              </li>
            ))}
            <li>
              <button type="button" className="header__subscription"><CrownIcon width={20} height={20} /> Assinatura</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
