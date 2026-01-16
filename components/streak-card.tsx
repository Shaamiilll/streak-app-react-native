import { Colors } from '@/constants/theme';
import { Streak } from '@/hooks/use-streaks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = Colors[colorScheme ?? 'light'];

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
    <View
      style={[
        styles.container,
        {
          borderLeftColor: streak.color,
          backgroundColor: isDark ? '#1e1e1e' : '#f8f9fa',
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {streak.name}
          </ThemedText>
          {streak.description && (
            <ThemedText
              type="default"
              style={[styles.description, { color: colors.subtitle }]}
            >
              {streak.description}
            </ThemedText>
          )}
        </View>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={isDark ? '#757575' : '#999'}
          />
        </TouchableOpacity>
      </View>

      {(streak.goalValue || streak.frequencyPerWeek) && (
        <View
          style={[
            styles.goalSection,
            {
              backgroundColor: isDark ? '#2c2c2c' : '#f0f0f0',
            },
          ]}
        >
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
          <ThemedText type="default" style={[styles.statLabel, { color: colors.subtitle }]}>
            Current
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {completionPercentage}%
          </ThemedText>
          <ThemedText type="default" style={[styles.statLabel, { color: colors.subtitle }]}>
            Completed
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {streak.totalCompletions}
          </ThemedText>
          <ThemedText type="default" style={[styles.statLabel, { color: colors.subtitle }]}>
            Total
          </ThemedText>
        </View>
      </View>

      <CalendarHeatmap
        completionHistory={streak.completionHistory || []}
        color={streak.color}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isCompletedToday
              ? isDark
                ? '#1b5e20'
                : '#e8f5e9'
              : '#007AFF',
          },
        ]}
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
          style={[
            styles.buttonText,
            {
              color: isCompletedToday ? '#4CAF50' : '#fff',
            },
          ]}
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
  },
  deleteButton: {
    padding: 4,
  },
  goalSection: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  goalText: {
    fontSize: 13,
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
    marginTop: 4,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});