import { Pressable, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import {
  StyleSheet,
  useColorScheme
} from 'react-native';
import { config } from '../config/gluestack-ui.config';
import { RGBToHex, colorGradientSteps } from '../utils';
import EventTimeline from './EventTimeline';

function EventsDisplay({
  dailyHabitEventData,
  habitData,
  selectedHabit,
  allHabitEventData,
  selectedDay, setSelectedDay
}) {
  const isDarkMode = useColorScheme() === 'dark';
  if (dailyHabitEventData?.length == 0 || habitData?.length == 0) {
    return <Text>No data.</Text>;
  }

  let dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  let timeOptions = {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  }
  let habit = habitData[selectedHabit];
  let relatedCounts = dailyHabitEventData.filter(
    entry => entry.habit == habit.name,
  );
  // look at last 28 days
  let counts = [];
  for (let i = 0; i < 28; i++) {
    let relevantDate = new Date(new Date() - 86400000 * i).toLocaleDateString(
      undefined,
      dateOptions,
    );
    let countsForDate = relatedCounts.filter(
      entry => entry.event_date == relevantDate,
    );
    counts.push({
      date: relevantDate,
      count: countsForDate.length == 0 ? 0 : countsForDate[0].count,
    });
  }

  let colors = colorGradientSteps(
    isDarkMode ? config.tokens.colors.backgroundDark900 : config.tokens.colors.backgroundLight100,
    config.tokens.colors.primary500,
    10,
  );

  return (
    <View>
      <View style={styles.blockContainer}>
        {counts.map((count, index) => {
          let colorHex = RGBToHex(
            count.count > 9 ? colors[9] : colors[count.count],
          );
          return (
            <Pressable
              key={index}
              style={[
                styles.block,
                {
                  backgroundColor: colorHex,
                  borderWidth: count.date == selectedDay ? 1 : 0,
                  borderColor: config.tokens.colors.primary300
                },
              ]}
              onPress={() => {
                setSelectedDay(selectedDay == count.date ? undefined : count.date);
              }}></Pressable>
          );
        })}
      </View>
      {selectedDay ? (
        <EventTimeline events={allHabitEventData.filter(event => {
          let thisDate = new Date(event.timestamp);
          return (
            event.habit == habit.name &&
            thisDate.toLocaleDateString(undefined, dateOptions) == selectedDay
          );
        })} selectedDay={selectedDay} />
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 9,
    rowGap: 9,
    marginBottom: 15,
  },
  block: {
    height: 40,
    maxWidth: 40,
    minWidth: 40,
    flex: 1,
    borderRadius: 5,
  },
});

export default EventsDisplay;
