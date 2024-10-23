export default function FormatedDate({ date }) {
  const dateConvert = new Date(date)

  // Check if the conversion was successful
  if (isNaN(dateConvert.getTime())) {
    return 'Invalid date format'
  }

  const formattedDate = dateConvert.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return <h5>{formattedDate}</h5>
}
