export function SourceTab() {
  const sourceCode = `import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://example.com/login');
  
  // Fill login form
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  
  // Submit form
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Verify redirect to dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  
  // Click on profile button
  await page.getByRole('button', { name: 'Profile' }).click();
  
  // Verify profile page
  await expect(page.getByText('User Profile')).toBeVisible();
});`

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">login.spec.ts</div>
        <button className="text-xs text-blue-500 hover:underline">Open in VSCode</button>
      </div>
      <pre className="text-sm font-mono bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto">
        {sourceCode.split("\n").map((line, i) => (
          <div key={i} className={`${i === 10 ? "bg-blue-100 dark:bg-blue-900/30" : ""}`}>
            <span className="inline-block w-8 text-gray-400">{i + 1}</span>
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}
