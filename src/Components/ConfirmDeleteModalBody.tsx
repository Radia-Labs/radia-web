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
  submitDelete: () => void;
  setDeleteModalIsOpen: (isOpen:boolean) => void;
}

const ConfirmDeleteModalBody = ({loading, submitDelete, setDeleteModalIsOpen}: Props) => {
    return (
    <Flex flexDirection="column" justifyContent="center" height="80%" >
       <H1>Confirm Delete</H1>
       <Paragraph fontSize=".8em" padding="0 5em" textAlign="center">Are you sure you want to delete this Collection?</Paragraph>  
       <Button margin="0 0 2em 0" background={colors.primaryRed} onClick={() => submitDelete()}>{!loading ? 'Delete Collection' : <Spinner margin="0 1em 0 1em"/> }</Button>
       <Text cursor="pointer" fontSize=".8em" fontWeight="400" onClick={() => setDeleteModalIsOpen(false)}>Cancel</Text>
    </Flex>)
}


export default ConfirmDeleteModalBody;