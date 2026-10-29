const anomalies = [
  { icon: '↯', title: 'Actualización perdida', text: 'Dos cambios sobre el mismo dato y uno desaparece.', color: 'orange', tag: 'WRITE / WRITE' },
  { icon: '◌', title: 'Lectura sucia', text: 'Lees información que todavía podría revertirse.', color: 'pink', tag: 'READ / WRITE' },
  { icon: '≠', title: 'No repetible', text: 'La misma consulta devuelve valores diferentes.', color: 'purple', tag: 'READ / WRITE' },
  { icon: '⁝', title: 'Fila fantasma', text: 'Aparecen nuevas filas al repetir una consulta.', color: 'blue', tag: 'RANGE / WRITE' },
]

function AnomalyCard({ anomaly }) {
  return (
    <article className={`anomaly-card ${anomaly.color}`}>
      <div className="card-topline"><span className="anomaly-icon">{anomaly.icon}</span><span className="card-tag">{anomaly.tag}</span></div>
      <h3>{anomaly.title}</h3>
      <p>{anomaly.text}</p>
      <span className="card-arrow">↗</span>
    </article>
  )
}

export function Anomalies() {
  return (
    <section className="content-section" id="anomalies">
      <div className="section-intro">
        <div><div className="section-kicker">01 / EL PROBLEMA</div><h2>Cuando dos manos<br /><span>tocan lo mismo.</span></h2></div>
        <p>La concurrencia mejora el rendimiento, pero las operaciones intercaladas pueden generar resultados inesperados. Estos son los errores que el control de concurrencia evita.</p>
      </div>
      <div className="anomaly-grid">{anomalies.map((anomaly) => <AnomalyCard key={anomaly.title} anomaly={anomaly} />)}</div>
    </section>
  )
}

export default AnomalyCard
