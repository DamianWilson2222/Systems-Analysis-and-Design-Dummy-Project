import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

// ADD EXPENSE SCREEN — Module 3
// A form that writes a new row into the Supabase expenses table
export default function AddExpenseScreen() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function ensureSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('Session Required', 'Please sign in before adding an expense.');
        router.replace('/');
      }
    }

    ensureSession();
  }, [router]);

  async function handleSubmit() {
    if (!description || !amount || !paidBy) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      Alert.alert('Session Required', 'Please sign in before adding an expense.');
      router.replace('/');
      return;
    }

    // Inserts a new row into the expenses table in Supabase
    const { error } = await supabase.from('expenses').insert([
      {
        user_id: user.id,
        description,
        amount: parseFloat(amount),
        paid_by: paidBy,
      },
    ]);

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Expense added!');
      router.back();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Pizza Friday"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Amount ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 24.99"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Paid By</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Damian"
        value={paidBy}
        onChangeText={setPaidBy}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Add Expense'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
  button: { backgroundColor: '#4f46e5', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelButton: { padding: 16, alignItems: 'center' },
  cancelText: { color: '#666', fontSize: 16 },
});
