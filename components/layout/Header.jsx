'use strict';

import { Heading, View } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import HabitSelector from '../HabitSelector';

function Header({ habitData, selectedHabit, setSelectedHabit, setHabitData, setDailyHabitEventData, setSelectedDay }) {
  return (
    <View
      style={[styles.header]}
      $dark-bg="$backgroundDark900"
      $light-bg="$backgroundLight0">
      <Heading size="3xl">Tracker</Heading>
      <HabitSelector
        habitData={habitData}
        selectedHabit={selectedHabit}
        setSelectedHabit={setSelectedHabit}
        setHabitData={setHabitData}
        setDailyHabitEventData={setDailyHabitEventData}
        setSelectedDay={setSelectedDay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    elevation: 2,
  }
});

export default Header;
