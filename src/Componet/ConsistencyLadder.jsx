const levels = [
  ['03', 'Grado 0', 'Sin protección', 'Permite leer datos no confirmados.'],
  ['02', 'Grado 1', 'Confirmación', 'Evita perder actualizaciones.'],
  ['01', 'Grado 2', 'Lectura estable', 'Bloquea lecturas no repetibles.'],
  ['00', 'Grado 3', 'Serializable', 'Máxima consistencia: como ejecutar en serie.'],
]

function ConsistencyLadder() {
  return (
    <section className="content-section consistency-section" id="consistency">
      <div className="section-intro compact">
        <div><div className="section-kicker">03 / EL EQUILIBRIO</div><h2>Escalera de<br /><span>consistencia.</span></h2></div>
        <p>A mayor grado, menos anomalías; también aumenta el costo de esperar. Elige el nivel según el riesgo de tu operación.</p>
      </div>
      <div className="ladder">
        {levels.map(([number, title, label, text], index) => <div className={`ladder-step step-${index + 1}`} key={title}><span className="ladder-number">{number}</span><div><h3>{title} <small>{label}</small></h3><p>{text}</p></div><span className="ladder-bar" /></div>)}
      </div>
    </section>
  )
}

export default ConsistencyLadder
