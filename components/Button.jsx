import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import Colors from './styling/Colors';

function Button({ title, index, onPress, buttonStyle, textStyle }) {
  const isDarkMode = useColorScheme() === 'dark';

  let buttonColorSchemeStyling = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.light,
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  return (
    <Pressable
      key={index ? index : title}
      style={[styles.button, buttonColorSchemeStyling, buttonStyle]}
      onPress={onPress}>
      <Text style={[styles.buttonText, buttonColorSchemeStyling, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Button;
