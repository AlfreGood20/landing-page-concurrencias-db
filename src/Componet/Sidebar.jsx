const menuItems = [
  { label: 'Panorama', href: '#inicio', number: '01' },
  { label: 'Anomalías', href: '#anomalies', number: '02' },
  { label: 'ACID', href: '#acid', number: '03' },
  { label: 'Consistencia', href: '#consistency', number: '04' },
  { label: 'Aislamiento', href: '#isolation', number: '05' },
  { label: 'SQL práctico', href: '#sql', number: '06' },
  { label: 'Commit / Rollback', href: '#transactions', number: '07' },
  { label: 'Integrantes', href: '#integrantes', number: '08' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#inicio" aria-label="Concurrencia DB, inicio">
        <span className="brand-mark">∿</span>
        <span>
          <strong>CONCURRENCIA</strong>
          <small>BASES DE DATOS</small>
        </span>
      </a>

      <div className="sidebar-heading">Temario unidad 04</div>
      <nav className="menu menu-sm gap-1 desktop-menu" aria-label="Temario de la unidad">
        {menuItems.map((item) => (
          <li key={item.href}>
            <a href={item.href}>
              <span className="menu-number">{item.number}</span>
              {item.label}
            </a>
          </li>
        ))}
      </nav>
      <details className="mobile-menu">
        <summary><span className="menu-summary-icon">☰</span> Temario de la unidad <span className="menu-chevron">⌄</span></summary>
        <nav className="menu menu-sm gap-1" aria-label="Temario de la unidad móvil">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <span className="menu-number">{item.number}</span>
                {item.label}
              </a>
            </li>
          ))}
        </nav>
      </details>

      <div className="sidebar-footer">
        <span className="status-dot" />
        <span>Guía de estudio</span>
        <span className="sidebar-version">v1.0</span>
      </div>
    </aside>
  )
}

export default Sidebar
