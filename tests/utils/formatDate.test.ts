import { test, expect } from '@playwright/test';
import { formatDate, isDateInPast } from '../../utils/formatDate';

test('formatDate formats a date correctly', () => {
  // Create a specific date for testing
  const date = new Date(2023, 0, 15); // January 15, 2023
  
  // Format the date
  const formattedDate = formatDate(date);
  
  // Check that the formatted date is correct
  expect(formattedDate).toBe('January 15, 2023');
});

test('isDateInPast returns true for past dates', () => {
  // Create a date in the past
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - 1); // One year ago
  
  // Check that the date is in the past
  expect(isDateInPast(pastDate)).toBe(true);
});

test('isDateInPast returns false for future dates', () => {
  // Create a date in the future
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1); // One year in the future
  
  // Check that the date is not in the past
  expect(isDateInPast(futureDate)).toBe(false);
});