
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import SimpleHashDetails from '../Components/SimpleHashDetails';
import {
  getNFTByTokenId
} from '../utils';
import { useCurrentUser } from "../Providers/Auth"
import { Overlay, Spinner } from '../Components/styles';

function CollectibleDetails() {
  const [loading, setLoading] = useState(false);
  const [collectible, setCollectible] = useState<object>();
  const params = useParams();
  const { currentUser } = useCurrentUser()

  useEffect(() => {
    const init = async () => {
        setLoading(true)
        const chain = params.chain;
        const contractAddress = params.contractAddress;
        const tokenId = params.tokenId;
        const _collectible = await getNFTByTokenId(currentUser?.idToken as string, currentUser?.appPubKey as string, chain as string, contractAddress as string, tokenId as string)
        setCollectible(_collectible)
        setLoading(false)
    }

    if (currentUser)
      init()

  }, [collectible, currentUser]);


  return (
    <>
      {loading && <Overlay>Loading...&nbsp;<Spinner/></Overlay>}
      {collectible ? <SimpleHashDetails currentUser={currentUser as any} collectible={collectible as any} /> : null}
    </>
  );
}

export default CollectibleDetails;