import {
    Button,
    ButtonText,
    CloseIcon,
    Heading,
    Icon,
    Input,
    InputField,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner
} from '@gluestack-ui/themed';
import React from 'react';
import { connectToDatabase, getHabits, insertHabit } from '../db/db';

function NewHabitModal({ isModalVisible, setIsModalVisible, setLoading, loading, setHabitData, setFormData, formData }) {
    return (
    <Modal
        isOpen={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">New Habit</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} h="$4"/>
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Input
              variant="underlined"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}>
              <InputField
                placeholder="Habit Name"
                onChangeText={text => {
                  setFormData({ ...formData, name: text });
                }}
              />
            </Input>
          </ModalBody>
          <ModalFooter>
            <Spinner
              mr="$2"
              size="large"
              color="$emerald600"
              animating={loading}></Spinner>
            <Button
              variant="solid"
              size="md"
              action="positive"
              onPress={async () => {
                setLoading(true);
                const db = await connectToDatabase();
                await insertHabit(db, formData.name);
                setHabitData(await getHabits(db));
                setIsModalVisible(false);
                setLoading(false);
              }}>
              <ButtonText>Add</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default NewHabitModal