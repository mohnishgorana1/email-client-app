export function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  // Format only the date part (DD/MM/YYYY)
  const formattedDate = date.toLocaleDateString("en-GB");

  // Format only the time part (hh:mm AM/PM)
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} ${formattedTime}`;
}

const formattedDate = formatDate(1582729505000);
console.log(formattedDate); // Output: "26/02/2020 10:25 am"
