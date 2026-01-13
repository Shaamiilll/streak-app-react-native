import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Streak {
  id: string;
  name: string;
  description?: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  createdDate: string;
  totalCompletions: number;
  color: string;
}

const STORAGE_KEY = 'streaks_data';

export function useStreaks() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load streaks from storage
  useEffect(() => {
    loadStreaks();
  }, []);

  const loadStreaks = async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setStreaks(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading streaks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveStreaks = async (data: Streak[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setStreaks(data);
    } catch (error) {
      console.error('Error saving streaks:', error);
    }
  };

  const createStreak = async (name: string, description?: string) => {
    const newStreak: Streak = {
      id: Date.now().toString(),
      name,
      description,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
      createdDate: new Date().toISOString(),
      totalCompletions: 0,
      color: getRandomColor(),
    };
    const updated = [...streaks, newStreak];
    await saveStreaks(updated);
    return newStreak;
  };

  const completeStreak = async (streakId: string) => {
    const updated = streaks.map((streak) => {
      if (streak.id === streakId) {
        const today = new Date().toISOString().split('T')[0];
        const lastCompleted = streak.lastCompletedDate?.split('T')[0];
        const isConsecutive = lastCompleted && isYesterday(lastCompleted, today);
        const isSameDay = lastCompleted === today;

        if (isSameDay) {
          return streak; // Already completed today
        }

        return {
          ...streak,
          currentStreak: isConsecutive || !lastCompleted ? streak.currentStreak + 1 : 1,
          longestStreak: Math.max(
            streak.longestStreak,
            isConsecutive || !lastCompleted ? streak.currentStreak + 1 : 1
          ),
          lastCompletedDate: new Date().toISOString(),
          totalCompletions: streak.totalCompletions + 1,
        };
      }
      return streak;
    });
    await saveStreaks(updated);
  };

  const deleteStreak = async (streakId: string) => {
    const updated = streaks.filter((streak) => streak.id !== streakId);
    await saveStreaks(updated);
  };

  const resetStreakData = async () => {
    await saveStreaks([]);
  };

  return {
    streaks,
    isLoading,
    createStreak,
    completeStreak,
    deleteStreak,
    resetStreakData,
    loadStreaks,
  };
}

function isYesterday(lastDate: string, today: string): boolean {
  const last = new Date(lastDate);
  const currentDate = new Date(today);
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);

  return last.toDateString() === yesterday.toDateString();
}

function getRandomColor(): string {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
  return colors[Math.floor(Math.random() * colors.length)];
}
