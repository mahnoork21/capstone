//Utility function which converts UTC time to EST time string
export function convertToEST(utcTimestamp) {
  const utcDate = new Date(utcTimestamp);
  const estDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return estDate.toLocaleString("en-US", options);
}
