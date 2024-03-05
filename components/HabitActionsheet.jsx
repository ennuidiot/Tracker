import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetIcon,
    ActionsheetItem,
    ActionsheetItemText,
    Icon,
    TrashIcon
} from '@gluestack-ui/themed';
import { connectToDatabase, deleteHabit, getHabits } from '../db/db';

function HabitActionsheet({
  isActionsheetVisible,
  setIsActionsheetVisible,
  setSelectedHabit,
  selectedHabit,
  selectedHabitForActionsheet,
  habitData,
  setHabitData,
  setSelectedHabitForActionsheet,
}) {
  return (
    <Actionsheet
      isOpen={isActionsheetVisible}
      onClose={() => setIsActionsheetVisible(false)}
      zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$20" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem
          onPress={async () => {
            if (selectedHabit == selectedHabitForActionsheet) {
              setSelectedHabit(0);
            }
            const db = await connectToDatabase();
            await deleteHabit(db, habitData[selectedHabitForActionsheet]);
            setIsActionsheetVisible(false);
            setHabitData(await getHabits(db));
            setSelectedHabitForActionsheet(undefined);
          }}>
          <ActionsheetIcon>
            <Icon as={TrashIcon} h="$4"/>
          </ActionsheetIcon>
          <ActionsheetItemText>Delete</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}

export default HabitActionsheet;
