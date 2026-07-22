declare const isoDateType: unique symbol
export type IsoDate =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}` & {
    [isoDateType]: true
  }

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/u
const isValidIsoDateFormat = (value: string): boolean => isoDatePattern.test(value)

export const isIsoDate = (value: string): value is IsoDate => {
  if (!isValidIsoDateFormat(value)) {
    return false
  }

  const [yearString, monthString, dayString] = value.split('-')
  const year = Number(yearString)
  const month = Number(monthString)
  const day = Number(dayString)

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false
  }

  if (month < 1 || month > 12) {
    return false
  }

  const daysInMonth = new Date(year, month, 0).getDate()

  return day >= 1 && day <= daysInMonth
}
