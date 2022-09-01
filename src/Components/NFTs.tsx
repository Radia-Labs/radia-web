import {Flex} from "../styles";
import {H1, Button} from '../Components/styles';
import { useCurrentUser } from "../Providers/Auth"
import AddToCollectionModalBody from './AddToCollectionModalBody';
import NFT from '../Components/NFT';
import {colors} from '../constants';
import {StyledModal} from '../styles';
import { ModalProvider } from 'styled-react-modal'
type Props = {
  loading: boolean;
  nfts: Array<object>;
  collections: Array<object>;
  selectedNFTs: Array<object>;
  showAddToCollection: () => void;
  setSelected: (nft: object) => void;
  showAddToCollectionModal: boolean;
  hideAddToCollection: () => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCollectionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  collectionName: string;
  submitCollection: () => void;
  updateCollection: () => void;
  collection: string;
};

const NFTs = ({
  loading, nfts, collections, selectedNFTs, 
  showAddToCollection, setSelected, showAddToCollectionModal, 
  hideAddToCollection, handleNameChange, handleCollectionChange, 
  collectionName, submitCollection, updateCollection, collection}: Props) => {    

  const { currentUser } = useCurrentUser()

    return (
      <Flex margin="0 0 5em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
      
      <Flex>
        <H1 fontSize="1.5rem">Your NFTs</H1>
        <Button
          onClick={showAddToCollection}
          background="transparent" 
          border={`1px solid ${colors.primaryLight}`} 
          disabled={selectedNFTs.length == 0}> 
          {collections && collections.length ? "Add To Collection" : "Create Collection"}
        </Button>
      </Flex>    

        <Flex justifyContent="flex-start" alignItems="left">
          {nfts.length ? nfts.map((nft: any) => {
            return (
            <NFT
              key={nft.sk}
              nft={nft}
              collectorImage={currentUser?.profileImage}
              setSelectedNFTs={setSelected}
              selectedNFTs={selectedNFTs as any}
            />          
            )
          }): null}

        </Flex>
            
          <ModalProvider>
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

        </Flex> 
    )
}


export default NFTs;

