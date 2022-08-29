export type User = {
    pk: string;
    sk: string;
    appPubKey: string;
    verifierId: string;
    profileImage: string;
    name: string;
    addresses: {polygon: string};
    idToken: string;
    created: number;
    prevState: null;
  }