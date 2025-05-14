/**
 * Formats a date into a readable string
 * @param date The date to format
 * @returns A formatted date string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Checks if a date is in the past
 * @param date The date to check
 * @returns True if the date is in the past, false otherwise
 */
export function isDateInPast(date: Date): boolean {
  const now = new Date();
  return date < now;
}