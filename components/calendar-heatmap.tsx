import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CalendarHeatmapProps {
  completionHistory: string[];
  color: string;
}

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ completionHistory, color }) => {
  // Get last 28 days
  const getLast28Days = () => {
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last28Days = getLast28Days();
  const completedDates = new Set(completionHistory.map((d) => d.split('T')[0]));

  // Organize into weeks (7 rows, 4 columns = 28 days)
  const weeks = [];
  for (let i = 0; i < 4; i++) {
    weeks.push(last28Days.slice(i * 7, (i + 1) * 7));
  }

  return (
    <View style={styles.container}>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.week}>
          {week.map((date) => {
            const isCompleted = completedDates.has(date);
            return (
              <View
                key={date}
                style={[
                  styles.day,
                  isCompleted && {
                    backgroundColor: color,
                  },
                ]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  week: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  day: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
  },
});
