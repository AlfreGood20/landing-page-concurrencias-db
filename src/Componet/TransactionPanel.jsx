import Icon from './Icons'

function TransactionPanel() {
  return (
    <section className="transaction-section" id="transactions">
      <div className="section-kicker">06 / EL CONTROL</div>
      <div className="transaction-heading"><h2>Decide cómo<br /><span>termina.</span></h2><p>Una transacción siempre llega a un punto de no retorno: confirmar lo que funcionó o deshacerlo todo.</p></div>
      <div className="transaction-grid">
        <article className="transaction-card commit"><div className="transaction-icon"><Icon name="check" size={21} /></div><div><span className="code-label">-- TODO CORRECTO</span><h3>COMMIT</h3><p>Confirma los cambios y los hace permanentes para todos.</p><code>COMMIT;</code></div></article>
        <article className="transaction-card rollback">
          <div className="transaction-icon"><Icon name="arrowUturn" size={21} /></div>
          <div>
            <span className="code-label">-- ALGO FALLÓ</span>
            <h3>ROLLBACK</h3>
            <p>Deshace una transacción cuando una operación falla, se cancela o rompe una regla de integridad.</p>
            <ul className="rollback-list">
              <li>Evita guardar cambios incompletos.</li>
              <li>Regresa al inicio o a un punto guardado.</li>
            </ul>
            <code>ROLLBACK TO savepoint_pago;</code>
          </div>
        </article>
      </div>
      <div className="flow-line"><span>BEGIN</span><i /><span>OPERACIONES</span><i /><b>COMMIT</b><i /><span>FIN</span></div>
    </section>
  )
}

export default TransactionPanel
