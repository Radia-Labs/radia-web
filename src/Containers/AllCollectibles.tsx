
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NFTs from '../Components/NFTs';
import {
  getNFTs,
  getCollections,
  getCollection,
  createCollection
} from '../utils';
import { Text, Button, FixedFooter, FooterActionsWrapper, Box } from '../Components/styles';
import { useCurrentUser } from "../Providers/Auth"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import AddToCollectionModalBody from '../Components/AddToCollectionModalBody';
import ErrorModalBody from '../Components/ErrorModalBody';
import { colors } from '../constants';
import {StyledModal} from '../styles';
import { ModalProvider } from 'styled-react-modal'
import { Overlay, Spinner } from '../Components/styles';

function AllCollectibles() {
    const [loadingData, setLoadingData] = useState(true);
    const [nfts, setNFTs] = useState<Array<object>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [nextUrl, setNextUrl] = useState<string|undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [collections, setCollections] = useState<Array<object>>();
    const [selectedNFTs, setSelectedNFTs] = useState<{chain:string, contract_address:string, token_id:string}[]>([])
    const [collectionName, setCollectionName] = useState<string>('')
    const [collection, setSelectedCollection] = useState<string>('')
    const [showAddToCollectionModal, setShowAddToCollectionModal] = useState<boolean>(false)    
    const { currentUser } = useCurrentUser()
    const navigate = useNavigate();


    useEffect(() => {
      const init = async () => {
      if (currentUser) {
        setSelectedNFTs([]) // hack to ensure that the selectedNFTs state is reset when currentUser changes.
        setLoadingData(true)
        await _getNfts()
        const _collections = await getCollections(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string);
        setCollections(_collections.Items)
        setLoadingData(false)
      }
    }

    if (currentUser)
      init()

  }, [currentUser])    

    useEffect(() => {
        if (loading)
            setShowAddToCollectionModal(true)
        else 
            setShowAddToCollectionModal(false)
    }, [loading])

    const _getNfts = async () => {
      const data = await getNFTs(currentUser?.idToken as string, currentUser?.appPubKey as string, 'polygon', currentUser?.addresses.polygon as string, nextUrl as string);
      setNFTs(data.nfts)
      setNextUrl(data.next)
    }    

    const loadMore = async () => {
      const data = await getNFTs(currentUser?.idToken as string, currentUser?.appPubKey as string, 'polygon', currentUser?.addresses.polygon as string, nextUrl as string);
      const _nfts = nfts?.concat(data.nfts)
      setNFTs(_nfts)
      setNextUrl(data.next)      
    }

    const handleCreateCollection = async (name: string, selectedNFTs: object[]) => {
        setLoading(true)
        const collection = await createCollection(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, name, selectedNFTs)
        setLoading(false)
        toast(`Successfully created ${name} collection.`);
        setSelectedNFTs([])
        const _collections = await getCollections(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string);
        setCollections(_collections.Items)   
    }
 
    const handleUpdateCollection = async (name: string, selectedNFTs: object[]) => {
        setLoading(true)
        const collection = await getCollection(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, `Collection|${name}`)
        const intersection = collection.Items[0].nfts.filter((a:{nft_id:string}) => selectedNFTs.some((b:any) => a.nft_id === b.nft_id));  
        const newNFTs = selectedNFTs.filter((a:any) => !intersection.some((b:{nft_id:string}) => a.nft_id === b.nft_id));
        const newArray = collection.Items[0].nfts.concat(newNFTs)
        const updatedCollection = await createCollection(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string, name, newArray)
        setLoading(false)
        toast(`Successfully updated ${name} collection.`);
        setSelectedNFTs([])
        const _collections = await getCollections(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string);
        setCollections(_collections.Items)        
    }
  
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
  
    const showAddToCollection = () => {
      setShowAddToCollectionModal(true)
    }
  
    const hideAddToCollection = () => {
      setShowAddToCollectionModal(false)
    }
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCollectionName(e.target.value)
    }
  
    const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedCollection(e.target.value)
    }
  
    const submitCollection = () => {
      handleCreateCollection(collectionName, selectedNFTs)
    }
  
    const updateCollection = () => {
      handleUpdateCollection(collection, selectedNFTs)
    }     
    
    const goToCollectible = () => {
      if (selectedNFTs.length == 1) {
        navigate(`/${selectedNFTs[0].chain}/${selectedNFTs[0].contract_address}/${selectedNFTs[0].token_id}`)
      }
  }

  const hideErrorModal = () => {
    setShowErrorModal(false)
  }

  const renderEmpty = () => {
    return <Text fontSize="1em" fontWeight="400">It looks like you don't have any Collectibles.<br/>
    <Text cursor="pointer" color={colors.seaGreen} fontSize="1em" fontWeight="400" onClick={() => navigate('/new-music')}>Click here</Text> to find new music and start earning!
    </Text>
  }

  return (
    <Box margin="0 0 5em 0">
      {loadingData && <Overlay>Loading...&nbsp;<Spinner/></Overlay>}
      {nfts ? <NFTs nfts={nfts as object[]} selectedNFTs={selectedNFTs} setSelected={setSelected}/> : null}
      {nextUrl ? <Button margin="0 0 0 0" background="transparent" border={`1px solid ${colors.primaryLight}`} disabled={!nextUrl} onClick={loadMore}>Load More</Button> : !loadingData ? renderEmpty() : null}
      
      <FixedFooter show={selectedNFTs.length}>
        <Text fontWeight="400">{selectedNFTs.length} {selectedNFTs.length > 1 ? 'collectibles' : 'collectible'} selected</Text>
        <FooterActionsWrapper justifyContent="flex-end" margin="0 5em">
          <Text
            fontWeight="400"
            fontSize="1em"
            cursor="pointer"
            disabled={selectedNFTs.length > 1}
            margin="0 3em 0 0"
            onClick={goToCollectible}
            border={`1px solid ${colors.primaryLight}`}> 
            View Collectible
          </Text>


          <Button
            margin="0 3em 0 0"
            onClick={showAddToCollection}
            background="transparent" 
            border={`1px solid ${colors.primaryLight}`} 
            disabled={selectedNFTs.length == 0}> 
            {collections && collections.length ? "Add To Collection" : "Create Collection"}
          </Button>
        </FooterActionsWrapper>

      </FixedFooter>

      <ModalProvider>
            <StyledModal
                isOpen={showErrorModal}
                onBackgroundClick={hideErrorModal}
                onEscapeKeydown={hideErrorModal}>
                <ErrorModalBody 
                title="Unable to Create Collection" 
                text="You must select at least two collectibles." 
                buttonText="Select More Collectibles"
                hideErrorModal={hideErrorModal}/>
            </StyledModal>  

            <StyledModal
                isOpen={showAddToCollectionModal}
                onBackgroundClick={hideAddToCollection}
                onEscapeKeydown={hideAddToCollection}>
                <AddToCollectionModalBody 
                loading={loading}
                handleNameChange={handleNameChange}
                handleCollectionChange={handleCollectionChange}
                collectionName={collectionName}
                collections={collections as object[]}
                submitCollection={() => submitCollection()}
                updateCollection={() => updateCollection()}
                collection={collection}
                />
            </StyledModal>        
          </ModalProvider>      

    <ToastContainer 
    position="bottom-right"
    theme="dark"
    hideProgressBar={true}
    />      
    </Box>
  );
}

export default AllCollectibles;