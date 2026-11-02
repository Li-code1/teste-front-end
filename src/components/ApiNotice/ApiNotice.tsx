import './ApiNotice.scss';

/** Avisa que a vitrine está mostrando dados de exemplo, nunca dados reais. */
export default function ApiNotice() {
  return (
    <p className="api-notice" role="status">
      Não foi possível carregar a API. Exibindo produtos de exemplo.
    </p>
  );
}
