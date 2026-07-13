import './App.css'

import { useState } from 'react'

function App() {
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date())
  const changeDate = (offsetMonth: number, offsetYear: number) => {
    setDisplayedDate(
      new Date(displayedDate.getFullYear() + offsetYear, displayedDate.getMonth() + offsetMonth, 1),
    )
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Application de calendrier</h1>
          <p>{displayedDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div>
          <button onClick={() => changeDate(-1, 0)}>Mois précédent</button>
          <button onClick={() => changeDate(1, 0)}>Mois suivant</button>
        </div>
        <div>
          <button onClick={() => changeDate(0, -1)}>Année précédente</button>
          <button onClick={() => changeDate(0, 1)}>Année suivante</button>
        </div>
      </section>
    </>
  )
}

export default App
