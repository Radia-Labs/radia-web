import { useState } from "react";
import { useWeb3Auth } from "../Services/web3auth";
import {
    H1,
    Paragraph,   
    Button,
    Text
} from "./styles";
import {Flex} from "../styles";
import { colors } from "../constants";

type Props = {
    setIsPrivateKeyModalOpen: (isOpen: boolean) => void;
}

const PrivateKeyModalBody = ({setIsPrivateKeyModalOpen}: Props) => {
    const { provider } = useWeb3Auth();
    const [showPrivateKey, setShowPrivateKey] = useState(false)
    const [privateKey, setPrivateKey] = useState('')

    const _showPrivateKey = async () => {
        const _privateKey = await provider?.getPrivateKey()
        setPrivateKey(_privateKey)
        setShowPrivateKey(true)
    }

    return (
    <Flex flexDirection="column" justifyContent="center" height="80%" >
       <H1>Export Private Key</H1>
       {!showPrivateKey && <Paragraph fontSize=".8em" padding="0 6em" textAlign="center">Click the button to reveal your provate key</Paragraph>}
       
       {!showPrivateKey && <Button background="transparent" color={colors.primaryOrange} border={`2px solid ${colors.primaryOrange}`} margin="0 0 1.5em 0" onClick={_showPrivateKey}>Reveal Private Key</Button>}
       {privateKey && showPrivateKey && <Paragraph color={colors.primaryOrange} fontSize=".8em" padding="0 6em" textAlign="center">{privateKey}</Paragraph>}
       <Text margin="0 0 2.5em 0" cursor="pointer" fontSize=".8em" fontWeight="400" onClick={() => setIsPrivateKeyModalOpen(false)}>Close Dialog</Text>
       <Paragraph fontSize=".5em" padding="0 6em" textAlign="center">Warning: never share this key. <br/>Anyone with your private key has full access to your account.</Paragraph>
    </Flex>)
}


export default PrivateKeyModalBody;