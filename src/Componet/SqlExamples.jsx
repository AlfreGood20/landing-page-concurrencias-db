function SqlExamples() {
  return (
    <section className="content-section sql-section" id="sql">
      <div className="section-intro compact">
        <div><div className="section-kicker">05 / EN LA PRÁCTICA</div><h2>La teoría<br /><span>se ejecuta.</span></h2></div>
        <p>Una transacción agrupa operaciones relacionadas. Si todo sale bien se confirma; si ocurre un error, se deshacen los cambios.</p>
      </div>
      <div className="sql-grid">
        <article className="sql-card">
          <div className="sql-card-heading"><span className="sql-dot green" /><h3>Transferencia segura</h3></div>
          <pre><code>{`BEGIN;

UPDATE cuentas
SET saldo = saldo - 500
WHERE id = 1;

UPDATE cuentas
SET saldo = saldo + 500
WHERE id = 2;

COMMIT;`}</code></pre>
          <p>Las dos actualizaciones se guardan como una sola unidad.</p>
        </article>
        <article className="sql-card">
          <div className="sql-card-heading"><span className="sql-dot red" /><h3>Deshacer cambios</h3></div>
          <pre><code>{`BEGIN;

UPDATE cuentas
SET saldo = saldo - 500
WHERE id = 1;

-- ocurre un error
ROLLBACK;`}</code></pre>
          <p>El saldo vuelve al estado anterior y no queda información parcial.</p>
        </article>
      </div>
      <div className="tip-callout"><strong>Idea clave</strong><span>La serializabilidad busca que una ejecución concurrente produzca el mismo resultado que alguna ejecución en serie.</span></div>
    </section>
  )
}

export default SqlExamples
