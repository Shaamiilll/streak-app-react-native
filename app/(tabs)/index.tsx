import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';

import { AddStreakModal } from '@/components/add-streak-modal';
import { StreakCard } from '@/components/streak-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useStreaks } from '@/hooks/use-streaks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const { streaks, isLoading, createStreak, completeStreak, deleteStreak, loadStreaks } =
    useStreaks();
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = Colors[colorScheme ?? 'light'];

  useFocusEffect(
    useCallback(() => {
      loadStreaks();
    }, [])
  );

  const handleCompleteStreak = (streakId: string) => {
    completeStreak(streakId);
  };

  const handleAddStreak = async (name: string, description?: string) => {
    await createStreak(name, description);
  };

  const handleDeleteStreak = (streakId: string, streakName: string) => {
    Alert.alert(
      'Delete Streak',
      `Are you sure you want to delete "${streakName}"?`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => deleteStreak(streakId),
          style: 'destructive',
        },
      ]
    );
  };

  const isCompletedToday = (lastCompletedDate: string | null): boolean => {
    if (!lastCompletedDate) return false;
    const today = new Date().toISOString().split('T')[0];
    const lastCompleted = lastCompletedDate.split('T')[0];
    return today === lastCompleted;
  };

  const getTotalStats = () => {
    return {
      totalStreaks: streaks.length,
      totalCompletions: streaks.reduce((sum, s) => sum + s.totalCompletions, 0),
      maxStreak: Math.max(...streaks.map((s) => s.currentStreak), 0),
    };
  };

  const stats = getTotalStats();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          My Streaks
        </ThemedText>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons name="plus" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {streaks.length > 0 && (
        <View
          style={[
            styles.statsBar,
            {
              backgroundColor: isDark ? '#1e1e1e' : '#f8f9fa',
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {stats.totalStreaks}
            </ThemedText>
            <ThemedText type="default" style={[styles.statLabel, { color: colors.subtitle }]}>
              Active
            </ThemedText>
          </View>
          <View
            style={[
              styles.divider,
              {
                backgroundColor: colors.border,
              },
            ]}
          />
          <View style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {stats.totalCompletions}
            </ThemedText>
            <ThemedText type="default" style={[styles.statLabel, { color: colors.subtitle }]}>
              Completed
            </ThemedText>
          </View>
          <View
            style={[
              styles.divider,
              {
                backgroundColor: colors.border,
              },
            ]}
          />
          <View style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {stats.maxStreak}
            </ThemedText>
            <ThemedText type="default" style={[styles.statLabel, { color: colors.subtitle }]}>
              Best Streak
            </ThemedText>
          </View>
        </View>
      )}

      {isLoading ? (
        <View style={styles.centerContent}>
          <ThemedText>Loading...</ThemedText>
        </View>
      ) : streaks.length === 0 ? (
        <View style={styles.centerContent}>
          <MaterialCommunityIcons
            name="star-outline"
            size={48}
            color={isDark ? '#555' : '#ccc'}
          />
          <ThemedText type="subtitle" style={styles.emptyText}>
            No Streaks Yet
          </ThemedText>
          <ThemedText style={[styles.emptyDescription, { color: colors.subtitle }]}>
            Create your first streak to get started!
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={streaks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StreakCard
              streak={item}
              onPress={() => handleCompleteStreak(item.id)}
              onDelete={() => handleDeleteStreak(item.id, item.name)}
              isCompletedToday={isCompletedToday(item.lastCompletedDate)}
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <AddStreakModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddStreak}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    width: 1,
    marginHorizontal: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
});
