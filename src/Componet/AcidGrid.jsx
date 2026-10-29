const acid = [
  ['A', 'Atomicidad', 'Todo o nada. Si una parte falla, se revierte la operación completa.'],
  ['C', 'Consistencia', 'Cada transacción lleva la base de un estado válido a otro válido.'],
  ['I', 'Aislamiento', 'Las transacciones concurrentes no ven cambios a medias.'],
  ['D', 'Durabilidad', 'Lo confirmado sobrevive a fallas y apagones.'],
]

function AcidGrid() {
  return (
    <section className="content-section acid-section" id="acid">
      <div className="section-intro compact">
        <div><div className="section-kicker">02 / LA PROMESA</div><h2>La regla <span>ACID.</span></h2></div>
        <p>Cuatro garantías que convierten una secuencia de operaciones en una transacción confiable.</p>
      </div>
      <div className="acid-grid">
        {acid.map(([letter, title, text]) => <article className="acid-card" key={letter}><strong>{letter}</strong><div><h3>{title}</h3><p>{text}</p></div></article>)}
      </div>
    </section>
  )
}

export default AcidGrid
