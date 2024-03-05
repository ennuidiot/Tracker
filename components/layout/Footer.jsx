'use strict';

import { Button, ButtonText, View } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  connectToDatabase,
  getEventsPerDay,
  getHabitEvents,
  insertHabitEvent,
} from '../../db/db';

function Footer({
  selectedHabit,
  habitData,
  setDailyHabitEventData,
  setAllHabitEventData,
}) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={async () => {
          const db = await connectToDatabase();
          await insertHabitEvent(db, habitData[selectedHabit].name);
          setDailyHabitEventData(await getEventsPerDay(db));
          setAllHabitEventData(await getHabitEvents(db));
        }}
        size="xl"
        variant="solid"
        action="primary" style={styles.button}>
        <ButtonText>Track</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "30%",
    maxWidth: 110,
    marginBottom: 15,
    elevation: 2,
  }, 
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center"
  }
});

export default Footer;
