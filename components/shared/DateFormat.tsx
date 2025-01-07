export const formatDate = (
  isoDate: string | null | undefined
): string | null => {
  if (!isoDate) return null; // Return null for null or undefined input

  const date = new Date(isoDate);

  // Check for invalid date
  if (isNaN(date.getTime())) return null;

  // Extract day, month, and year
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-based
  const year = date.getUTCFullYear();

  // Return the formatted date
  return `${day}-${month}-${year}`;
};

export const calculateRemainingDays = (
  startDate: string,
  expiryDate: string
): number => {
  const start = new Date(startDate);
  const expiry = new Date(expiryDate);

  // Calculate the difference in time (milliseconds)
  const diffInTime = expiry.getTime() - start.getTime();

  // Convert milliseconds to days
  const remainingDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Removed parseInt

  return remainingDays;
};
