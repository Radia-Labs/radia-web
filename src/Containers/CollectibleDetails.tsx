
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3Auth } from "../Services/web3auth";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import Details from '../Components/Details';
import {
  getUser,
  getCollectible
} from '../utils';

function CollectibleDetails() {
  const { provider, web3Auth } = useWeb3Auth();
  const [collectible, setCollectible] = useState<object>();
  const params = useParams();

  useEffect(() => {
    // fetch collectible details

    const init = async () => {
      const appScopedPrivateKey = await provider?.getPrivateKey()
      const appPubKey = getPublicCompressed(Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")).toString("hex"); 
      const authUser = await web3Auth?.getUserInfo()
      const radiaUser = await getUser(authUser?.idToken as string, appPubKey as string, authUser?.verifierId as string)  
      const _collectible = await getCollectible(authUser?.idToken as string, appPubKey, radiaUser.Items[0].pk ,params.sk as string);
      console.log(_collectible.Items[0])
      setCollectible(_collectible.Items[0])
    }

    if (!collectible && provider)
      init()
  }, [provider]);


  return (
    <>
      {collectible ? <Details collectible={collectible as any}/> : null}
    </>
  );
}

export default CollectibleDetails;