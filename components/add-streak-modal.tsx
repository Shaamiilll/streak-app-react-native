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
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ThemedText type="title" style={styles.title}>
              New Streak
            </ThemedText>

            <TextInput
              style={styles.input}
              placeholder="Streak name (e.g., Running, Reading)"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
              multiline
              placeholderTextColor="#999"
            />

            <ThemedText type="default" style={styles.sectionLabel}>
              Goal (Optional)
            </ThemedText>
            
            <View style={styles.goalRow}>
              <TextInput
                style={[styles.input, styles.goalInput]}
                placeholder="Amount"
                value={goalValue}
                onChangeText={setGoalValue}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.input, styles.goalInput]}
                placeholder="Unit (e.g., steps)"
                value={goalUnit}
                onChangeText={setGoalUnit}
                placeholderTextColor="#999"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Frequency per week (e.g., 3)"
              value={frequencyPerWeek}
              onChangeText={setFrequencyPerWeek}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <ThemedText type="defaultSemiBold" style={styles.cancelButtonText}>
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
    backgroundColor: '#fff',
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
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
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
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
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
  },
});
