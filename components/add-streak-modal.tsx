import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';
import { ThemedText } from './themed-text';

interface AddStreakModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, description?: string, goalValue?: number, goalUnit?: string, frequencyPerWeek?: number) => void;
}

export const AddStreakModal: React.FC<AddStreakModalProps> = ({ visible, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const [goalUnit, setGoalUnit] = useState('');
  const [frequencyPerWeek, setFrequencyPerWeek] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = Colors[colorScheme ?? 'light'];

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(
        name.trim(),
        description.trim() || undefined,
        goalValue ? parseInt(goalValue) : undefined,
        goalUnit.trim() || undefined,
        frequencyPerWeek ? parseInt(frequencyPerWeek) : undefined
      );
      setName('');
      setDescription('');
      setGoalValue('');
      setGoalUnit('');
      setFrequencyPerWeek('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View
          style={[
            styles.content,
            {
              backgroundColor: isDark ? '#1e1e1e' : '#fff',
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <ThemedText type="title" style={styles.title}>
              New Streak
            </ThemedText>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? '#2c2c2c' : '#f5f5f5',
                  color: isDark ? '#fff' : '#000',
                  borderColor: isDark ? '#3c3c3c' : '#ddd',
                },
              ]}
              placeholder="Streak name (e.g., Running, Reading)"
              placeholderTextColor={isDark ? '#888' : '#999'}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
                {
                  backgroundColor: isDark ? '#2c2c2c' : '#f5f5f5',
                  color: isDark ? '#fff' : '#000',
                  borderColor: isDark ? '#3c3c3c' : '#ddd',
                },
              ]}
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
              multiline
              placeholderTextColor={isDark ? '#888' : '#999'}
            />

            <ThemedText type="default" style={styles.sectionLabel}>
              Goal (Optional)
            </ThemedText>
            
            <View style={styles.goalRow}>
              <TextInput
                style={[
                  styles.input,
                  styles.goalInput,
                  {
                    backgroundColor: isDark ? '#2c2c2c' : '#f5f5f5',
                    color: isDark ? '#fff' : '#000',
                    borderColor: isDark ? '#3c3c3c' : '#ddd',
                  },
                ]}
                placeholder="Amount"
                value={goalValue}
                onChangeText={setGoalValue}
                keyboardType="numeric"
                placeholderTextColor={isDark ? '#888' : '#999'}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.goalInput,
                  {
                    backgroundColor: isDark ? '#2c2c2c' : '#f5f5f5',
                    color: isDark ? '#fff' : '#000',
                    borderColor: isDark ? '#3c3c3c' : '#ddd',
                  },
                ]}
                placeholder="Unit (e.g., steps)"
                value={goalUnit}
                onChangeText={setGoalUnit}
                placeholderTextColor={isDark ? '#888' : '#999'}
              />
            </View>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? '#2c2c2c' : '#f5f5f5',
                  color: isDark ? '#fff' : '#000',
                  borderColor: isDark ? '#3c3c3c' : '#ddd',
                },
              ]}
              placeholder="Frequency per week (e.g., 3)"
              value={frequencyPerWeek}
              onChangeText={setFrequencyPerWeek}
              keyboardType="numeric"
              placeholderTextColor={isDark ? '#888' : '#999'}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {
                    borderColor: isDark ? '#3c3c3c' : '#ddd',
                  },
                ]}
                onPress={onClose}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={[
                    styles.cancelButtonText,
                    {
                      color: isDark ? '#fff' : '#333',
                    },
                  ]}
                >
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addButton, !name.trim() && styles.disabledButton]}
                onPress={handleAdd}
                disabled={!name.trim()}
              >
                <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
                  Add Streak
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionLabel: {
    marginBottom: 8,
    marginTop: 12,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  goalRow: {
    flexDirection: 'row',
    gap: 12,
  },
  goalInput: {
    flex: 1,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
