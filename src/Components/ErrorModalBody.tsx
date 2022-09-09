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
  title: string;
  text: string;
  buttonText: string;
  hideErrorModal: () => void;
}

const ErrorModalBody = ({title, text, buttonText, hideErrorModal }: Props) => {
    return (
    <Flex flexDirection="column" justifyContent="center" height="80%" >
       <H1>{title}</H1>
       <Paragraph fontSize=".8em" padding="0 5em" textAlign="center">{text}</Paragraph>  
       <Button margin="0 0 2em 0" background={colors.primaryOrange} onClick={() => hideErrorModal()}>{buttonText}</Button>
    </Flex>)
}


export default ErrorModalBody;