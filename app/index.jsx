import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { demoAccounts, shouldShowDemoAccounts } from '../lib/demoAccounts';

export default function AccountAccessScreen() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      const { data } = await supabase.auth.getSession();
      if (isMounted && data.session) {
        router.replace('/expenses');
      }
    }

    restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/expenses');
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  async function handlePrimaryAuth() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    const { data, error } =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email: cleanEmail, password })
        : await supabase.auth.signUp({ email: cleanEmail, password });
    setLoading(false);

    if (error) {
      Alert.alert(mode === 'login' ? 'Login Failed' : 'Create Account Failed', error.message);
      return;
    }

    if (data.session) {
      router.replace('/expenses');
      return;
    }

    Alert.alert(
      'Account Created',
      'Your account was created. If email confirmation is enabled, please confirm your email before logging in.'
    );
  }

  async function handleDemoLogin(demoAccount) {
    if (!demoAccount.email || !demoAccount.password) {
      Alert.alert(
        'Demo Account Not Configured',
        `Set ${demoAccount.emailEnvVar} and ${demoAccount.passwordEnvVar} in your local .env file to enable this demo account.`
      );
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: demoAccount.email,
      password: demoAccount.password,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Demo Login Failed', error.message);
    } else {
      router.replace('/expenses');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Splitter</Text>
      <Text style={styles.subtitle}>Choose how you want to access your account</Text>

      <View style={styles.modeRow}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'login' && styles.modeButtonActive]}
          onPress={() => setMode('login')}
          disabled={loading}
        >
          <Text style={[styles.modeButtonText, mode === 'login' && styles.modeButtonTextActive]}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeButton, mode === 'signup' && styles.modeButtonActive]}
          onPress={() => setMode('signup')}
          disabled={loading}
        >
          <Text style={[styles.modeButtonText, mode === 'signup' && styles.modeButtonTextActive]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handlePrimaryAuth} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      {shouldShowDemoAccounts ? (
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Demo Accounts (Development)</Text>
          <Text style={styles.demoSubtitle}>
            These are local testing shortcuts. Configure credentials in your local .env file.
          </Text>

          {demoAccounts.map((account) => (
            <TouchableOpacity
              key={account.id}
              style={[styles.demoButton, !account.isConfigured && styles.demoButtonDisabled]}
              onPress={() => handleDemoLogin(account)}
              disabled={loading}
            >
              <Text style={styles.demoButtonText}>
                {account.label}
                {account.isConfigured ? '' : ' (Not Configured)'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  modeRow: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  modeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modeButtonActive: { backgroundColor: '#eef2ff', borderColor: '#4f46e5' },
  modeButtonText: { color: '#374151', fontWeight: '600' },
  modeButtonTextActive: { color: '#4f46e5' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#4f46e5', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  demoSection: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  demoTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  demoSubtitle: { fontSize: 13, color: '#6b7280', marginBottom: 12 },
  demoButton: {
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  demoButtonDisabled: {
    backgroundColor: '#6b7280',
  },
  demoButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
