import Icon from './Icons'

function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-copy">
        <div className="eyebrow"><span /> UNIDAD 04 · SISTEMAS DE DATOS</div>
        <h1>Concurrencia<br /><em>sin conflictos.</em></h1>
        <p className="hero-lead">
          Cómo varios usuarios pueden trabajar al mismo tiempo sin perder la
          integridad, el orden ni la confianza en los datos.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#acid">Comenzar recorrido <Icon name="arrowDown" size={14} /></a>
          <a className="text-link" href="#sql">Ver ejemplos SQL <Icon name="arrowUpRight" size={13} /></a>
        </div>
      </div>
      <div className="hero-visual" aria-label="Ilustración de concurrencia en bases de datos">
        <img
          className="hero-image"
          src="https://cdn-icons-png.magnific.com/512/15102/15102529.png"
          alt="Ilustración relacionada con bases de datos y transacciones"
        />
      </div>
    </section>
  )
}

export default Hero
