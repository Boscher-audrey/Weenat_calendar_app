import './App.css'

import { useState } from 'react'

function App() {
  const [todaysDate, setTodaysDate] = useState<Date>(new Date())

  return (
    <>
      <section id="center">
        <div>
          <h1>Application de calendrier</h1>
          <p>{todaysDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>
    </>
  )
}

export default App
