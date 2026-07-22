type CalendarHeaderProps = {
  displayedDate: Date
  onChangeDate: (offsetMonth: number, offsetYear: number) => void
}

export const CalendarHeader = ({ displayedDate, onChangeDate }: CalendarHeaderProps) => {
  return (
    <div>
      <div className="date-container">
        <button onClick={() => onChangeDate(-1, 0)}>{'<'}</button>
        <p className="month">{displayedDate.toLocaleString('fr-FR', { month: 'long' })}</p>
        <button onClick={() => onChangeDate(1, 0)}>{'>'}</button>
      </div>

      <div className="date-container">
        <button onClick={() => onChangeDate(0, -1)}>{'<'}</button>
        <p>{displayedDate.toLocaleString('fr-FR', { year: 'numeric' })}</p>
        <button onClick={() => onChangeDate(0, 1)}>{'>'}</button>
      </div>
    </div>
  )
}
