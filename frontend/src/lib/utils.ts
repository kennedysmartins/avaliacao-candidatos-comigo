export function formatDate(dataString: string | number | Date) {
  const data = new Date(dataString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }
  const formatadorDeData = new Intl.DateTimeFormat("pt-BR", options)
  return formatadorDeData.format(data)
}