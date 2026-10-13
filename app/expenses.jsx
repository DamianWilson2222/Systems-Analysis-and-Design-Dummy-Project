import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

// EXPENSES SCREEN — Module 2
// Pulls all expenses from Supabase and displays them as a list
// Also has a logout button and a button to navigate to Add Expense
export default function ExpensesScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      router.replace('/');
      return;
    }

    // Reads only this user's rows from the expenses table in Supabase
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setExpenses(data);
    }
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/');
  }

  function renderExpense({ item }) {
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.paidBy}>Paid by: {item.paid_by}</Text>
        </View>
        <Text style={styles.amount}>${parseFloat(item.amount).toFixed(2)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : expenses.length === 0 ? (
        <Text style={styles.empty}>No expenses yet. Add one!</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderExpense}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-expense')}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold' },
  logout: { color: '#ef4444', fontSize: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  description: { fontSize: 16, fontWeight: '600' },
  paidBy: { fontSize: 13, color: '#666', marginTop: 4 },
  amount: { fontSize: 20, fontWeight: 'bold', color: '#4f46e5' },
  loading: { textAlign: 'center', marginTop: 40, color: '#666' },
  empty: { textAlign: 'center', marginTop: 40, color: '#666', fontSize: 16 },
  addButton: { backgroundColor: '#4f46e5', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
