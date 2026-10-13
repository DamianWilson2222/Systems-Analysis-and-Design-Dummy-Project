import { Stack } from 'expo-router';

// This is the root layout — it wraps every screen in the app
// Stack gives us the navigation header and back button behaviour
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Account Access' }} />
      <Stack.Screen name="expenses" options={{ title: 'Expenses' }} />
      <Stack.Screen name="add-expense" options={{ title: 'Add Expense' }} />
    </Stack>
  );
}
