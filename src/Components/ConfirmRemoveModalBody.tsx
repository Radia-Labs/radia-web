import {
    H1,
    Paragraph,
    Button,
    Text,
    Spinner
} from "./styles";
import {Flex} from "../styles";
import { colors } from "../constants";

type Props = {
  loading: boolean;
  submitRemove: () => void;
  setRemoveModalIsOpen: (isOpen:boolean) => void;
}

const ConfirmRemoveModalBody = ({loading, submitRemove, setRemoveModalIsOpen}: Props) => {
    return (
    <Flex flexDirection="column" justifyContent="center" height="80%" >
       <H1>Confirm Remove</H1>
       <Paragraph fontSize=".8em" padding="0 5em" textAlign="center">Are you sure you want to remove selected items from Collection?</Paragraph>  
       <Button margin="0 0 2em 0" background={colors.primaryRed} onClick={() => submitRemove()}>{!loading ? 'Remove From Collection' : <Spinner margin="0 1em 0 1em"/> }</Button>
       <Text cursor="pointer" fontSize=".8em" fontWeight="400" onClick={() => setRemoveModalIsOpen(false)}>Cancel</Text>
    </Flex>)
}


export default ConfirmRemoveModalBody;