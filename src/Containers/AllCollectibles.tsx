
import {useEffect, useState} from 'react';
import NFTs from '../Components/NFTs';
import {
  getNFTs,
  getCollections,
  getCollection,
  createCollection
} from '../utils';
import { Text, Button, FixedFooter, Box } from '../Components/styles';
import { useCurrentUser } from "../Providers/Auth"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { colors } from '../constants';

function AllCollectibles() {
    const [nfts, setNFTs] = useState<Array<object>>();
    const [nextUrl, setNextUrl] = useState<string|undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [collections, setCollections] = useState<Array<object>>();
    const [selectedNFTs, setSelectedNFTs] = useState<object[]>([])
    const [collectionName, setCollectionName] = useState<string>('')
    const [collection, setSelectedCollection] = useState<string>('')
    const [showAddToCollectionModal, setShowAddToCollectionModal] = useState<boolean>(false)    
    const { currentUser } = useCurrentUser()


    useEffect(() => {
      const init = async () => {
      if (currentUser) {
        await _getNfts()
        const _collections = await getCollections(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.verifierId as string);
        setCollections(_collections.Items)
        setSelectedNFTs([]) // hack to ensure that the selectedNFTs state is reset when currentUser changes.
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
      if (selectedNFTs.length > 0) {
        setShowAddToCollectionModal(true)
      }
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

  return (
    <Box margin="0 0 5em 0">
      {nfts ? <NFTs loading={loading} nfts={nfts as object[]} collections={collections as object[]} selectedNFTs={selectedNFTs} 
      showAddToCollection={showAddToCollection} setSelected={setSelected} showAddToCollectionModal={showAddToCollectionModal}
      hideAddToCollection={hideAddToCollection} handleNameChange={handleNameChange} handleCollectionChange={handleCollectionChange}
      collectionName={collectionName} submitCollection={submitCollection} updateCollection={updateCollection} collection={collection}
      /> : null}
      
      {nextUrl ? <Button margin="0 0 0 0" background="transparent" border={`1px solid ${colors.primaryLight}`} disabled={!nextUrl} onClick={loadMore}>Load More</Button>: null}
      
      <FixedFooter show={selectedNFTs.length}>
        <Text fontWeight="400">{selectedNFTs.length} {selectedNFTs.length > 1 ? 'collectibles' : 'collectible'} selected</Text>
        <Button
          margin="0 3em 0 0"
          onClick={showAddToCollection}
          background="transparent" 
          border={`1px solid ${colors.primaryLight}`} 
          disabled={selectedNFTs.length == 0}> 
          {collections && collections.length ? "Add To Collection" : "Create Collection"}
        </Button>
      </FixedFooter>

    <ToastContainer 
    position="bottom-right"
    theme="dark"
    hideProgressBar={true}
    />      
    </Box>
  );
}

export default AllCollectibles;