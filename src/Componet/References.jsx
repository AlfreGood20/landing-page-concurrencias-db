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
        <div className="references-heading">
          <div className="section-kicker">REFERENCIAS BIBLIOGRÁFICAS</div>
          <h2>Fuentes<br /><span>consultadas.</span></h2>
          <p>Referencias redactadas según las normas APA, séptima edición.</p>
        </div>
        <div className="reference-list">
          <a href="https://www.postgresql.org/docs/current/transaction-iso.html" target="_blank" rel="noreferrer">
            The PostgreSQL Global Development Group. (s. f.). <em>PostgreSQL documentation: 13.2. Transaction isolation</em>. PostgreSQL. Recuperado el 29 de octubre de 2026, de https://www.postgresql.org/docs/current/transaction-iso.html <span>↗</span>
          </a>
          <a href="https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html" target="_blank" rel="noreferrer">
            Oracle Corporation. (s. f.). <em>MySQL 8.4 reference manual: 17.7.2.1 Transaction isolation levels</em>. MySQL. Recuperado el 29 de octubre de 2026, de https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html <span>↗</span>
          </a>
          <a href="https://dl.acm.org/doi/10.1145/356842.356846" target="_blank" rel="noreferrer">
            Gray, J., &amp; Reuter, A. (1993). <em>Transaction processing: Concepts and techniques</em>. Morgan Kaufmann. <span>↗</span>
          </a>
          <a href="https://doi.org/10.1145/223848.223849" target="_blank" rel="noreferrer">
            Berenson, H., Bernstein, P., Gray, J., Melton, J., O&apos;Neil, E., &amp; O&apos;Neil, P. (1995). A critique of ANSI SQL isolation levels. <em>ACM SIGMOD Record, 24</em>(2), 1–10. https://doi.org/10.1145/223848.223849 <span>↗</span>
          </a>
        </div>
        <p className="copyright">CONCURRENCIA DB · GUÍA VISUAL DE ESTUDIO · 2026</p>
      </footer>
    </>
  )
}

export default References
