import {Flex} from "../styles";
import {H1} from '../Components/styles';
import { useCurrentUser } from "../Providers/Auth"
import NFT from '../Components/NFT';

type Props = {
  nfts: Array<object>;
  selectedNFTs: Array<object>;
  setSelected: (nft: object) => void;
};

const NFTs = ({nfts, selectedNFTs, setSelected}: Props) => {    

  const { currentUser } = useCurrentUser()

    return (

      <Flex margin="0 0 2em 0" flexDirection="column" alignItems="left" justifyContent="flex-start">
      
      <Flex>
        <H1 fontSize="1.5rem">Your Collectibles</H1>

      </Flex>    

        <Flex justifyContent="flex-start" alignItems="left">
          {nfts.length ? nfts.map((nft: any) => {
            return (
            <NFT
              key={nft.nft_id}
              nft={nft}
              isSelected={selectedNFTs.includes(nft)}
              collectorImage={currentUser?.profileImage}
              setSelectedNFTs={setSelected}
              selectedNFTs={selectedNFTs as any}
            />          
            )
          }): null}

        </Flex>

        </Flex> 
        
    )
}


export default NFTs;

