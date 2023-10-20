export const capitalizeEveryWord = (string) => {
  // Replace hyphens with spaces
  const stringWithSpaces = string.replace(/-/g, " ");

  return stringWithSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
