import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDownIcon,
  Icon,
  Menu,
  MenuItem,
  MenuItemLabel,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import HabitActionsheet from './HabitActionsheet';
import NewHabitModal from './NewHabitModal';

function HabitSelector({
  habitData,
  selectedHabit,
  setSelectedHabit,
  setHabitData,
  setSelectedDay,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActionsheetVisible, setIsActionsheetVisible] = useState(false);
  const [selectedHabitForActionsheet, setSelectedHabitForActionsheet] =
    useState(undefined);
  const [formData, setFormData] = useState({ name: undefined });
  const [loading, setLoading] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let selected = habitData[selectedHabit]
    ? habitData[selectedHabit].name
    : 'Loading..';
  return (
    <>
      <Menu
        placement="top right"
        trigger={({ ...triggerProps }) => {
          return (
            <Button
              {...triggerProps}
              size="md"
              ml="auto"
              variant="link"
              action="secondary"
              isDisabled={false}
              isFocusVisible={false}>
              <ButtonText mr="$1">{selected}</ButtonText>
              <ButtonIcon as={ChevronDownIcon} />
            </Button>
          );
        }}>
        {habitData.map((habit, index) => {
          return (
            <MenuItem
              key={habit.name}
              textValue={habit.name}
              onPress={() => {
                setSelectedDay(undefined);
                setSelectedHabit(index);
              }}
              onLongPress={() => {
                setSelectedHabitForActionsheet(index);
                setIsActionsheetVisible(true);
              }}
              $dark-bg={
                index == selectedHabit ? '$backgroundDark800' : undefined
              }
              $light-bg={
                index == selectedHabit ? '$backgroundLight100' : undefined
              }>
              <MenuItemLabel size="sm">{habit.name}</MenuItemLabel>
            </MenuItem>
          );
        })}
        <MenuItem key="Add" textValue="Add" onPress={toggleModal}>
          <Icon as={AddIcon} size="sm" mr="$2" />
          <MenuItemLabel size="sm">Add</MenuItemLabel>
        </MenuItem>
      </Menu>
      <NewHabitModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setLoading={setLoading}
        loading={loading}
        setHabitData={setHabitData}
        setFormData={setFormData}
        formData={formData}
      />
      <HabitActionsheet
        setHabitData={setHabitData}
        setSelectedHabitForActionsheet={setSelectedHabitForActionsheet}
        isActionsheetVisible={isActionsheetVisible}
        setIsActionsheetVisible={setIsActionsheetVisible}
        setSelectedHabit={setSelectedHabit}
        selectedHabit={selectedHabit}
        selectedHabitForActionsheet={selectedHabitForActionsheet}
        habitData={habitData}
      />
    </>
  );
}

export default HabitSelector;
