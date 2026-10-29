import Sidebar from './Componet/Sidebar'
import Hero from './Componet/Hero'
import { Anomalies } from './Componet/AnomalyCard'
import AcidGrid from './Componet/AcidGrid'
import ConsistencyLadder from './Componet/ConsistencyLadder'
import IsolationTable from './Componet/IsolationTable'
import SqlExamples from './Componet/SqlExamples'
import TransactionPanel from './Componet/TransactionPanel'
import References from './Componet/References'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Hero />
        <Anomalies />
        <AcidGrid />
        <ConsistencyLadder />
        <IsolationTable />
        <SqlExamples />
        <TransactionPanel />
        <References />
      </main>
    </div>
  )
}

export default App
