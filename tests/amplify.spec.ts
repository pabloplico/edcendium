import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('amplify_outputs.json exists and has correct structure', () => {
  // Check that the file exists
  const outputsPath = path.join(process.cwd(), 'amplify_outputs.json');
  expect(fs.existsSync(outputsPath)).toBeTruthy();
  
  // Read and parse the file
  const outputsContent = fs.readFileSync(outputsPath, 'utf8');
  const outputs = JSON.parse(outputsContent);
  
  // Check that the file has the expected structure
  expect(outputs).toHaveProperty('auth');
  expect(outputs.auth).toHaveProperty('userPoolId');
  expect(outputs.auth).toHaveProperty('userPoolClientId');
  expect(outputs.auth).toHaveProperty('identityPoolId');
  expect(outputs.auth).toHaveProperty('region');
  
  expect(outputs).toHaveProperty('api');
  expect(outputs.api).toHaveProperty('GraphQLAPIEndpointOutput');
  expect(outputs.api).toHaveProperty('GraphQLAPIKeyOutput');
});

test('amplify.yml has correct Gen 2 configuration', () => {
  // Check that the file exists
  const amplifyYmlPath = path.join(process.cwd(), 'amplify.yml');
  expect(fs.existsSync(amplifyYmlPath)).toBeTruthy();
  
  // Read the file
  const amplifyYmlContent = fs.readFileSync(amplifyYmlPath, 'utf8');
  
  // Check that the file contains the expected commands
  expect(amplifyYmlContent).toContain('npx amplify sandbox');
  expect(amplifyYmlContent).toContain('npx amplify generate outputs');
  expect(amplifyYmlContent).toContain('npx amplify deploy');
});

test('auth configuration includes user roles', () => {
  // Check that the file exists
  const authResourcePath = path.join(process.cwd(), 'amplify', 'auth', 'resource.ts');
  expect(fs.existsSync(authResourcePath)).toBeTruthy();
  
  // Read the file
  const authResourceContent = fs.readFileSync(authResourcePath, 'utf8');
  
  // Check that the file contains user role configuration
  expect(authResourceContent).toContain('userAttributes');
  expect(authResourceContent).toContain('role');
});