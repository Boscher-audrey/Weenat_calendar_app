type CalendarHeaderProps = {
  displayedDate: Date
  onChangeDate: (offsetMonth: number, offsetYear: number) => void
}

export const CalendarHeader = ({
  displayedDate,
  onChangeDate: changeDate,
}: CalendarHeaderProps) => {
  return (
    <div>
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
  )
}
