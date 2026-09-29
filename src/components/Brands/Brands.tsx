import logo from '../../assets/img/logo.png';
import './Brands.scss';

const BRANDS = [1, 2, 3, 4, 5];

export default function Brands() {
  return (
    <section className="brands" aria-labelledby="brands-title">
      <h2 id="brands-title" className="brands__title">Navegue por marcas</h2>
      <ul className="brands__list">
        {BRANDS.map((id) => (
          <li key={id}>
            <a href="#" className="brands__item" aria-label={`Marca ${id}`}>
              <img src={logo} alt="" width={100} height={30} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
