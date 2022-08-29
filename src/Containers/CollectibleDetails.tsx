
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Details from '../Components/Details';
import {
  getCollectible
} from '../utils';
import { useCurrentUser } from "../Providers/Auth"


function CollectibleDetails() {
  const [collectible, setCollectible] = useState<object>();
  const params = useParams();
  const { currentUser } = useCurrentUser()

  useEffect(() => {
    const init = async () => {
      const _collectible = await getCollectible(currentUser?.idToken as string, currentUser?.appPubKey as string, currentUser?.pk as string, params.sk as string);
      setCollectible(_collectible.Items[0])
    }

    if (!collectible && currentUser)
      init()

  }, [currentUser]);


  return (
    <>
      {collectible ? <Details collectible={collectible as any}/> : null}
    </>
  );
}

export default CollectibleDetails;