export const APP_URL = window.location.host === 'localhost:3000' ? 'http://localhost:3000' : 'https://beta.radia.world'
export const SERVER_URL = window.location.host === 'localhost:3000' ? 'http://localhost:8000' : 'https://qk8wia3761.execute-api.us-east-1.amazonaws.com/prod'
export const MEDIA_CDN_HOST = "https://d2sad41dyn6p9s.cloudfront.net/images";
export const USER_MEDIA_CDN_HOST = "https://dmwjt3rkp0nih.cloudfront.net/images"
export const WEB3AUTH_CLIENT_ID = "BGxkBWK7vys1C_Obsc8FP2gYhitvoYr8jfwSWVHMbXS4WlMAKkiUioXey1gHJFC4MCPsVfoPAh2nM8uzFn5Fd2g"

export const WEB3AUTH_NETWORK = {
  mainnet: {
    displayName: "Mainnet",
  },
  testnet: {
    displayName: "Testnet",
  },
  cyan: {
    displayName: "Cyan",
  },
} as const;

export type WEB3AUTH_NETWORK_TYPE = keyof typeof WEB3AUTH_NETWORK;

export const colors = {
    primaryDark: '#141420',
    secondaryDark: '#32323f',
    primaryLight: '#FFFFFF',
    secondaryLight: '#EBEBEB',
    darkMagenta: '#E250E5',
    darkPurple: '#4B50E6',
    brightGreen: '#2fbd59',
    darkGrey: '#464649',
    lightGrey: '#8A8AA0',
    seaGreen: '#28cf8d',
    primaryRed: '#e55555',
    primaryOrange: '#ffb072'
} as const;

export const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

  export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
  } as const;

  