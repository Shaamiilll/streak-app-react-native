import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from './themed-text';
import { Streak } from '@/hooks/use-streaks';

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
            {streak.longestStreak}
          </ThemedText>
          <ThemedText type="default" style={styles.statLabel}>
            Longest
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
          {isCompletedToday ? 'Completed Today' : 'Complete Today'}
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
    marginRight: 8,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  deleteButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
    opacity: 0.6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  buttonCompleted: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  buttonTextCompleted: {
    color: '#4CAF50',
  },
});
