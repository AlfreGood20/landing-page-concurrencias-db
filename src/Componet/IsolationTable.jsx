const rows = [
  ['Read Uncommitted', '✓', '✓', '✓', '✓', 'Máximo'],
  ['Read Committed', '—', '✓', '✓', '✓', 'Alto'],
  ['Repeatable Read', '—', '—', '—', '✓', 'Medio'],
  ['Serializable', '—', '—', '—', '—', 'Bajo'],
]

function IsolationTable() {
  return (
    <section className="content-section isolation-section" id="isolation">
      <div className="section-intro compact">
        <div><div className="section-kicker">04 / LA CONFIGURACIÓN</div><h2>Niveles de<br /><span>aislamiento.</span></h2></div>
        <p>El estándar SQL ofrece cuatro niveles para decidir qué anomalías permites y cuánto bloqueo estás dispuesto a asumir.</p>
      </div>
      <div className="table-wrap">
        <table className="table isolation-table">
          <thead><tr><th>Nivel SQL</th><th>Lectura sucia</th><th>No repetible</th><th>Fantasma</th><th>Actualización perdida</th><th>Rendimiento</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td className={index > 0 && index < 5 ? (cell === '✓' ? 'allowed' : 'blocked') : ''} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  )
}

export default IsolationTable
