import './App.css'

import { useState } from 'react'

function App() {
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date())

  const daysInMonth = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth() + 1,
    0,
  ).getDate()

  const daysBeforeFirstDayOfMonth: number =
    (new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1).getDay() + 6) % 7

  const changeDate = (offsetMonth: number, offsetYear: number) => {
    setDisplayedDate(
      new Date(displayedDate.getFullYear() + offsetYear, displayedDate.getMonth() + offsetMonth, 1),
    )
  }

  const daysTitle = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di']

  const getDaysInMonth = () => {
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1)
    const emptyDays = []
    for (let i = 0; i < daysBeforeFirstDayOfMonth; i++) {
      emptyDays.push(null)
    }
    const weeks: Array<string | number | null> = [...emptyDays, ...days]

    return weeks
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Application de calendrier</h1>
          <div className="date-container">
            <button onClick={() => changeDate(-1, 0)}>{'<'}</button>
            <p className="month">{displayedDate.toLocaleString('fr-FR', { month: 'long' })}</p>
            <button onClick={() => changeDate(1, 0)}>{'>'}</button>
          </div>

          <div className="date-container">
            <button onClick={() => changeDate(0, -1)}>{'<'}</button>
            <p>{displayedDate.toLocaleString('fr-FR', { year: 'numeric' })}</p>
            <button onClick={() => changeDate(0, 1)}>{'>'}</button>
          </div>
        </div>

        <div className="calendar">
          {daysTitle.map((dayTitle, dayTitleIndex) => (
            <div className="day-title" key={'dayTitle-' + dayTitleIndex}>
              {dayTitle}
            </div>
          ))}

          {getDaysInMonth().map((day, dayIndex) =>
            day === null ? (
              <div className="day-empty" key={'day-empty-' + dayIndex} />
            ) : (
              <div className="day" key={'day-' + dayIndex}>
                {day}
              </div>
            ),
          )}
        </div>
      </section>
    </>
  )
}

export default App
