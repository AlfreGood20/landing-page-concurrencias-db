function References() {
  return (
    <>
      <section className="members-section" id="integrantes">
        <div><div className="section-kicker">07 / EQUIPO</div><h2>Personas detrás<br /><span>del tema.</span></h2></div>
        <ol className="members-list">
          <li>José Alfredo López De La Cruz</li>
          <li>Diego Alberto Ramírez Hernández</li>
          <li>Víctor Emiliano Garduza Álvarez</li>
          <li>Alexander Vidal Gallegos</li>
        </ol>
      </section>
      <footer className="references">
      <div><div className="section-kicker">REFERENCIAS</div><h2>Para seguir<br /><span>investigando.</span></h2></div>
      <div className="reference-list"><a href="https://www.postgresql.org/docs/current/transaction-iso.html" target="_blank" rel="noreferrer">PostgreSQL · Transaction Isolation <span>↗</span></a><a href="https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html" target="_blank" rel="noreferrer">MySQL · InnoDB Isolation Levels <span>↗</span></a><a href="https://dl.acm.org/doi/10.1145/356842.356846" target="_blank" rel="noreferrer">Gray &amp; Reuter · Transaction Processing <span>↗</span></a></div>
      <p className="copyright">CONCURRENCIA DB · GUÍA VISUAL DE ESTUDIO · 2026</p>
      </footer>
    </>
  )
}

export default References
