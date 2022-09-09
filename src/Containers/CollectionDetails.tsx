import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCurrentUser } from "../Providers/Auth"
import {getCollection, deleteCollection, createCollection} from '../utils';
import { Flex } from '../styles';
import {H1, Text, Button, FixedFooter, FooterActionsWrapper} from '../Components/styles';
import NFT from '../Components/NFT';
import { colors } from '../constants';
import {StyledModal} from '../styles';
import { ModalProvider } from 'styled-react-modal'
import ConfirmDeleteModalBody from '../Components/ConfirmDeleteModalBody';
import ConfirmRemoveModalBody from '../Components/ConfirmRemoveModalBody';

function CollectibleDetails() {
    const { currentUser } = useCurrentUser()
    const [collection, setCollection] = useState<{
        name: string,
        nfts: any[]
    }>();
    const [selectedNFTs, setSelectedNFTs] = useState<{chain:string, contract_address:string, token_id:string}[]>([]);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
    const [removeModalIsOpen, setRemoveModalIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const _collection = await getCollection(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, params.sk as string)
            setCollection(_collection.Items[0])
            setSelectedNFTs([]) // hack to ensure that the selectedNFTs state is reset when currentUser changes.
        }

        if (currentUser)
            init()

    }, [currentUser]);

    const setSelected = (item: any) => {
        if (selectedNFTs.includes(item)) {
          var array = [...selectedNFTs];
          var index = array.indexOf(item)
          if (index !== -1) {
            array.splice(index, 1);
            setSelectedNFTs(array)
          }
        } else {
          setSelectedNFTs([...selectedNFTs, item])
        }
      }    

    const submitDelete = async () => {
        setLoading(true)
        await deleteCollection(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, params.sk as string)
        setDeleteModalIsOpen(false)
        setLoading(false)
        navigate('/')
    }

    const goToCollectible = () => {
        if (selectedNFTs.length == 1) {
            navigate(`/${selectedNFTs[0].chain}/${selectedNFTs[0].contract_address}/${selectedNFTs[0].token_id}`)
        }
    }

    const handleRemove = async () => {
        setRemoveModalIsOpen(true)
    }

    const removeCollectibles = async () => {
        setLoading(true)
        if (selectedNFTs.length === collection?.nfts.length) {
            alert("You can't remove all the collectibles from a collection.")
            return
        }
        const newArray:any = []
        collection?.nfts.forEach((nft) => {
            if (!selectedNFTs.includes(nft)) {
                newArray.push(nft)
            }
        })

        await createCollection(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, collection?.name as string, newArray)
        setRemoveModalIsOpen(false)
        setSelectedNFTs([])
        const _collection = await getCollection(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, params.sk as string)
        setCollection(_collection.Items[0])       
        setLoading(false)


    }

    return (
        collection ? <>
        <Flex>
            <H1>{collection.name}</H1>
            <Text fontSize=".8em" color={colors.primaryRed} cursor="pointer" onClick={() => setDeleteModalIsOpen(true)}>Delete Collection</Text>
        </Flex>
        <Flex justifyContent="flex-start">
            
            {collection.nfts.map((collectible) => {
                return <NFT
                    key={collectible.nft_id}
                    isSelected={selectedNFTs.includes(collectible)}
                    nft={collectible}
                    collectorImage={currentUser?.profileImage}
                    setSelectedNFTs={setSelected}
                    selectedNFTs={selectedNFTs as any}
                />  
            })}
        </Flex>

        <FixedFooter show={selectedNFTs.length}>
            <Text fontWeight="400">{selectedNFTs.length} {selectedNFTs.length > 1 ? 'collectibles' : 'collectible'} selected</Text>
            <FooterActionsWrapper justifyContent="flex-end" margin="0 5em">
                
                <Button
                disabled={selectedNFTs.length > 1}
                margin="0 3em 0 0"
                onClick={goToCollectible}
                background="transparent" 
                border={`1px solid ${colors.primaryLight}`}> 
                View Collectible
                </Button>

                <Text
                fontSize=".8em"
                cursor="pointer"
                color={colors.primaryRed}
                onClick={() => {handleRemove()}}> 
                Remove From Collection
                </Text>
            </FooterActionsWrapper>

        </FixedFooter>        
        
        <ModalProvider>
            <StyledModal
                isOpen={deleteModalIsOpen}
                onBackgroundClick={() => setDeleteModalIsOpen(false)}
                onEscapeKeydown={() => setDeleteModalIsOpen(false)}>
                <ConfirmDeleteModalBody 
                    loading={loading}
                    setDeleteModalIsOpen={setDeleteModalIsOpen}
                    submitDelete={() => submitDelete()}
                />
            </StyledModal>      

            <StyledModal
                isOpen={removeModalIsOpen}
                onBackgroundClick={() => setRemoveModalIsOpen(false)}
                onEscapeKeydown={() => setRemoveModalIsOpen(false)}>
                <ConfirmRemoveModalBody 
                    loading={loading}
                    setRemoveModalIsOpen={setRemoveModalIsOpen}
                    submitRemove={() => removeCollectibles()}
                />
            </StyledModal>               
          </ModalProvider>        

          
        
        </> : null
    );
}

export default CollectibleDetails;