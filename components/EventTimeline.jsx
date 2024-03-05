import { Card, Heading, Text, View } from '@gluestack-ui/themed';
import { StyleSheet, useColorScheme } from 'react-native';
import { config } from '../config/gluestack-ui.config';

function EventTimeline({ events, selectedDay }) {
  const isDarkMode = useColorScheme() === 'dark';
  let backgroundColor = isDarkMode
    ? config.tokens.colors.backgroundDark800
    : config.tokens.colors.backgroundLight200;
  let startOfDay = new Date(events[0]?.timestamp);
  startOfDay.setHours(0, 0, 0, 0);
  let endOfDay = new Date(events[0]?.timestamp);
  endOfDay.setHours(23, 59, 59, 999);
  let timeInDay = endOfDay - startOfDay;
  let eventCount = events.length;
  return (
    <View>
      <Card
        size="md"
        variant="filled"
        my="$3"
        style={{
          borderTopColor: config.tokens.colors.primary300,
          borderTopWidth: 5,
        }}
        pt="$3">
        <View style={styles.headingsContainer}>
          <Heading size="md">{selectedDay}</Heading>
          {eventCount != 0 ? (
            <Text $dark-color="$textDark500" $light-color="$textLight400">
              {eventCount} event{eventCount != 1 ? 's' : ''}
            </Text>
          ) : (
            ''
          )}
        </View>

        {eventCount != 0 ? (
          <View
            style={[
              styles.timelineContainer,
              { backgroundColor: backgroundColor },
            ]}>
            {events.map((event, index) => {
              let thisDate = new Date(event.timestamp);
              let timeSinceStart = thisDate - startOfDay;
              let percentageOfDay = timeSinceStart / timeInDay;
              return (
                <View
                  key={index}
                  style={[
                    styles.timelineEvent,
                    {
                      left: `${percentageOfDay * 100}%`,
                      backgroundColor: config.tokens.colors.primary500,
                    },
                  ]}></View>
              );
            })}
          </View>
        ) : (
          <Text>No events.</Text>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  headingsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineContainer: {
    height: 22,
  },
  timelineEvent: {
    position: 'absolute',
    top: 0,
    width: 1,
    height: 22,
  },
});

export default EventTimeline;
