const rawDemoAccounts = [
  {
    id: 'alice',
    label: 'Use Alice Demo Account',
    emailEnvVar: 'EXPO_PUBLIC_DEMO_ALICE_EMAIL',
    passwordEnvVar: 'EXPO_PUBLIC_DEMO_ALICE_PASSWORD',
  },
  {
    id: 'bob',
    label: 'Use Bob Demo Account',
    emailEnvVar: 'EXPO_PUBLIC_DEMO_BOB_EMAIL',
    passwordEnvVar: 'EXPO_PUBLIC_DEMO_BOB_PASSWORD',
  },
  {
    id: 'charlie',
    label: 'Use Charlie Demo Account',
    emailEnvVar: 'EXPO_PUBLIC_DEMO_CHARLIE_EMAIL',
    passwordEnvVar: 'EXPO_PUBLIC_DEMO_CHARLIE_PASSWORD',
  },
];

export const demoAccounts = rawDemoAccounts.map((account) => {
  const email = (process.env[account.emailEnvVar] || '').trim().toLowerCase();
  const password = process.env[account.passwordEnvVar] || '';

  return {
    ...account,
    email,
    password,
    isConfigured: Boolean(email && password),
  };
});

export const shouldShowDemoAccounts =
  __DEV__ || process.env.EXPO_PUBLIC_ENABLE_DEMO_ACCOUNTS === 'true';
