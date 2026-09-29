import partnerBg from '../../assets/img/partner-bg.jpg';
import './PartnerBanners.scss';

const PARTNERS = [1, 2];

export default function PartnerBanners() {
  return (
    <section className="partners" aria-label="Parceiros">
      {PARTNERS.map((id) => (
        <article
          key={id}
          className="partners__card"
          style={{ backgroundImage: `url(${partnerBg})` }}
        >
          <h2 className="partners__title">Parceiros</h2>
          <p className="partners__text">Lorem ipsum dolor sit amet, consectetur</p>
          <a href="#" className="partners__button">Confira</a>
        </article>
      ))}
    </section>
  );
}
