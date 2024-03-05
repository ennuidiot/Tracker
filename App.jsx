import {
  GluestackUIProvider,
  Heading,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View
} from '@gluestack-ui/themed';
import React, { useCallback, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import MaterialYou from 'react-native-material-you-colors';
import EventsDisplay from './components/EventsDisplay';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { config } from './config/gluestack-ui.config';
import {
  connectToDatabase,
  createTables,
  getEventsPerDay,
  getHabitEvents,
  getHabits,
} from './db/db';
function App() {
  const [dailyHabitEventData, setDailyHabitEventData] = useState([]);
  const [allHabitEventData, setAllHabitEventData] = useState([]);
  const [habitData, setHabitData] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(0);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const isDarkMode = useColorScheme() === 'dark';
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
    } catch (error) {
      console.error(error);
    }
  });
  useEffect(() => {
    loadData();
  }, [loadData]);
  useEffect(() => {
    fetchHabitAndEvents();
  }, []);
  async function fetchHabitAndEvents() {
    const db = await connectToDatabase();
    setDailyHabitEventData(await getEventsPerDay(db));
    setAllHabitEventData(await getHabitEvents(db));
    setHabitData(await getHabits(db));
  }
  useEffect(() => {}, []);
  const backgroundStyle = {
    height: '100%',
  };
  
  // If there are Material You colours, we're going to use those for primary, secondary and tertiary
  if (MaterialYou.isSupported) {
    console.log("Using Material You accents")
    var materialStuff = MaterialYou.getMaterialYouPalette();
    let accentColours = Object.fromEntries(
      Object.entries(materialStuff)
        .filter(entry => entry[0].includes('accent'))
        .map(entry => [entry[0], entry[1].slice(1, -1)]),
    );

    let configColorKeysToReplace = ['primary', 'secondary', 'tertiary'];
    let materialKeys = Object.keys(accentColours).sort(
      (a, b) => parseInt(a.slice(-1)) - parseInt(b.slice(-1)),
    );
    let allConfigColorKeys = Object.keys(config.tokens.colors);
    configColorKeysToReplace.forEach((key, index) => {
      let relatedMaterialKey = materialKeys[index];
      let relatedMaterialColors = accentColours[relatedMaterialKey];
      if (index == 2) {
        relatedMaterialColors = relatedMaterialColors.slice(1, -1);
      }
      let relatedConfigKeys = allConfigColorKeys.filter(thisKey =>
        thisKey.includes(key),
      );
      relatedConfigKeys.forEach((key, index) => {
        config.tokens.colors[key] = relatedMaterialColors[index];
      });
    });
  }

  return (
    <GluestackUIProvider colorMode={useColorScheme()} config={config}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
        $dark-bg="$backgroundDark950"
        $light-bg="$backgroundLight0">
        <StatusBar />
        <Header
          habitData={habitData}
          selectedHabit={selectedHabit}
          setSelectedHabit={setSelectedHabit}
          setHabitData={setHabitData}
          setDailyHabitEventData={setDailyHabitEventData}
          setSelectedDay={setSelectedDay}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View mx="$6" my="$3">
            <Heading size="xl" mb="$1">
              Last 28 days
            </Heading>
            <EventsDisplay
              dailyHabitEventData={dailyHabitEventData}
              habitData={habitData}
              selectedHabit={selectedHabit}
              allHabitEventData={allHabitEventData}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </View>
        </ScrollView>
        <Footer
          selectedHabit={selectedHabit}
          habitData={habitData}
          setDailyHabitEventData={setDailyHabitEventData}
          setAllHabitEventData={setAllHabitEventData}
        />
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
export default App;
