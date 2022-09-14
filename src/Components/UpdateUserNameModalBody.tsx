import {Box, H1, Paragraph, Button, Input, Spinner} from "./styles";
import {colors} from "../constants";

type Props = {
    loading: boolean;
    userName: string | undefined;
    updateUserName: () => void;
    handleUserNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UpdateUserNameModalBody = ({loading, userName, updateUserName, handleUserNameChange}: Props) => { 
    return (
        <Box padding="1em" textAlign="center">
            <H1>Update User Name</H1>
            <Paragraph textAlign="center">Type a new user name in the input below.</Paragraph>
            <Input placeholder="User Name" margin="0 0 1em 0" onChange={handleUserNameChange}/>
            <Button onClick={updateUserName} width="100%" background={`${colors.darkPurple}`} disabled={userName && userName?.length < 1}>{ loading ? <Spinner/> : "Update User Name" }</Button>
        </Box>
    )
}

export default UpdateUserNameModalBody