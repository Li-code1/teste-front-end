import heroBg from '../../assets/img/hero-bg.jpg';
import './Hero.scss';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero__inner">
        <h1 id="hero-title" className="hero__title">Venha conhecer nossas promoções</h1>
        <p className="hero__subtitle"><strong>50% Off</strong> nos produtos</p>
        <a href="#produtos" className="hero__button">Ver produto</a>
      </div>
    </section>
  );
}
