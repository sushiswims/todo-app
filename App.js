import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

const INITIAL_TASKS = [
  { key: '1', description: 'Buy groceries', completed: false },
  { key: '2', description: 'Walk the dog', completed: true },
  { key: '3', description: 'Read for 30 minutes', completed: false },
  { key: '4', description: 'Call mom', completed: false },
  { key: '5', description: 'Do laundry', completed: true },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [inputText, setInputText] = useState('');

  const toggleTask = (key) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    const newTask = {
      key: Date.now().toString(),
      description: trimmed,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setInputText('');
  };

  const deleteTask = (key) => {
    setTasks((prev) => prev.filter((task) => task.key !== key));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        onPress={() => toggleTask(item.key)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.completed }}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <Text
        style={[
          styles.taskText,
          item.completed && {
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid',
            color: '#aaa',
          },
        ]}
      >
        {item.description}
      </Text>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteTask(item.key)}
        accessibilityLabel="Delete task"
      >
        <Text style={styles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSub}>
          {completedCount} of {tasks.length} completed
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: tasks.length ? `${(completedCount / tasks.length) * 100}%` : '0%' },
          ]}
        />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet — add one below!</Text>
          </View>
        }
      />

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#D6D3FF',
    marginTop: 4,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#D6D3FF',
    width: '100%',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#FFC94A',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 8,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#2D2D4E',
    fontWeight: '500',
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 8,
  },
  deleteBtnText: {
    fontSize: 15,
    color: '#ccc',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D2D4E',
    paddingVertical: 6,
  },
  addBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 10,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
