export type User = {
    pk: string;
    sk: string;
    userName: string;
    email: string;
    appPubKey: string;
    verifierId: string;
    profileImage: string;
    name: string;
    addresses: {polygon: string};
    idToken: string;
    created: number;
    prevState: null;
  }