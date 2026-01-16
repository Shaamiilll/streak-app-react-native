import { Streak } from '@/hooks/use-streaks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CalendarHeatmap } from './calendar-heatmap';
import { ThemedText } from './themed-text';

interface StreakCardProps {
  streak: Streak;
  onPress: () => void;
  onDelete: () => void;
  isCompletedToday: boolean;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  streak,
  onPress,
  onDelete,
  isCompletedToday,
}) => {
  const getCompletionPercentage = () => {
    if (streak.frequencyPerWeek && streak.currentStreak > 0) {
      const expectedCompletions = Math.floor((streak.currentStreak / 7) * streak.frequencyPerWeek);
      if (expectedCompletions === 0) return 0;
      return Math.min(100, Math.round((streak.totalCompletions / expectedCompletions) * 100));
    }
    return 0;
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <View style={[styles.container, { borderLeftColor: streak.color }]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {streak.name}
          </ThemedText>
          {streak.description && (
            <ThemedText type="default" style={styles.description}>
              {streak.description}
            </ThemedText>
          )}
        </View>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <MaterialCommunityIcons name="delete" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {(streak.goalValue || streak.frequencyPerWeek) && (
        <View style={styles.goalSection}>
          <ThemedText type="default" style={styles.goalText}>
            {streak.goalValue && `Goal: ${streak.goalValue} ${streak.goalUnit || 'units'}`}
            {streak.goalValue && streak.frequencyPerWeek && ' | '}
            {streak.frequencyPerWeek && `${streak.frequencyPerWeek} days a week`}
          </ThemedText>
        </View>
      )}

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {streak.currentStreak}
          </ThemedText>
          <ThemedText type="default" style={styles.statLabel}>
            Current
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {completionPercentage}%
          </ThemedText>
          <ThemedText type="default" style={styles.statLabel}>
            Completed
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {streak.totalCompletions}
          </ThemedText>
          <ThemedText type="default" style={styles.statLabel}>
            Total
          </ThemedText>
        </View>
      </View>

      <CalendarHeatmap
        completionHistory={streak.completionHistory || []}
        color={streak.color}
      />

      <TouchableOpacity
        style={[styles.button, isCompletedToday && styles.buttonCompleted]}
        onPress={onPress}
        disabled={isCompletedToday}
      >
        <MaterialCommunityIcons
          name={isCompletedToday ? 'check-circle' : 'plus-circle'}
          size={24}
          color={isCompletedToday ? '#4CAF50' : '#fff'}
        />
        <ThemedText
          type="defaultSemiBold"
          style={[styles.buttonText, isCompletedToday && styles.buttonTextCompleted]}
        >
          {isCompletedToday ? 'Done' : 'Complete Today'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    color: '#666',
  },
  deleteButton: {
    padding: 4,
  },
  goalSection: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  goalText: {
    fontSize: 13,
    color: '#555',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonCompleted: {
    backgroundColor: '#e8f5e9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextCompleted: {
    color: '#4CAF50',
  },
});