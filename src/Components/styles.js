import styled, {keyframes} from 'styled-components';
import {MEDIA_CDN_HOST, colors, device} from '../constants';

export const Layout = styled.div`
  padding: 5rem 5rem;
`
export const Header = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 5rem;
    background-color: ${colors.secondaryDark};
`  

export const Logo = styled.div`
    background-image: url('${window.location.origin}/logo.svg');
    height: 1rem;
    width: 1rem;
    line-height: 1.3rem;
    background-size: contain;
    background-repeat: no-repeat;
    padding-right: 5px;
`
export const Paragraph = styled.div`
    font-size: ${props => props.fontSize || '.8rem'};
    color: ${colors.primaryLight};
    text-align: ${props => props.textAlign || 'left'};
    padding: ${props => props.padding || '0'};
    padding-bottom: ${props => props.paddingBottom || '1rem'};
`

export const H1 = styled.h1`
    font-size: ${props => props.fontSize || '1.2rem'}; 
    font-weight: 700;
    color: ${colors.primaryLight};
`

export const GradientButton = styled.button`
    border: none;
    border-radius: 30px;
    padding: 0.5rem 3rem;
    background:  ${props => props.background || `linear-gradient(216.56deg, ${colors.darkMagenta}, ${colors.darkPurple})`}; 
    border:  ${props => props.border || 'none'}; 
    font-size: .8rem;
    font-weight: 700;
    line-height: .8rem;
    color: ${colors.primaryLight};
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover { opacity:.9; };
    &:active { transform: scale(1.05); };
    margin: ${props => props.margin || 'none'}; 
    white-space: nowrap;
`

export const SpotifyModalImage = styled.div`
    background-image: url('${window.location.origin}/spotify-logo.svg');
    height: 2em;
    width: 120px;  
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
`

export const CollectibleCard = styled.div`
    background-color: ${colors.secondaryDark};
    border-radius: 20px;  
    padding: 1em; 
    margin-bottom: 1em; 
    margin-right: 1em;

    @media ${device.laptop} { 
        width: 16.2em;
        height: 20em;
    }

    @media ${device.laptopL} { 
        width: 17.5em;
        height: 20.5em;
    }    
    
    @media ${device.desktop} {
        width: 20em;
        height: 20.5em;
    }

`

export const CollectibleImage = styled.div`
    height: 14.6em;
    border-radius: 20px;
    background-image: url('${props => props.image}');
    margin-bottom: 1em;
    background-size: cover;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;    

    @media ${device.laptop} { 
        height: 14.6em;
    }

    @media ${device.laptopL} { 
        height: 14.6em;
    }    
     
`

export const CollectibleName = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 700;
    font-size: 1.1em;
    padding-bottom: 1em;
    color: ${colors.primaryLight};
`

export const CollectorImage = styled.img`
    width: 2.1em;
    height: 2.1em;
    border-radius: 8px;
    background-image: url('${props => props.image}');
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;    
`

export const CollectorLabel = styled.div`
    color: ${colors.lightGrey};
    font-size: .8em;
`

export const CollectorName = styled.div`
    color: ${colors.secondaryLight};
    font-size: .8em;
    
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 1px solid ${colors.lightGrey};
  border-right: 1px solid ${colors.lightGrey};
  border-bottom: 1px solid ${colors.lightGrey};
  border-left: 2px solid ${colors.lightGrey};
  background: transparent;
  width: .5em;
  height: .5em;
  border-radius: 50%;
`
export const PaginateNextWrapper = styled.div`
    padding: 10px;
    border-radius: 50%;
    background-color: ${colors.primaryLight};
    opacity: ${props => !props.lastEvaluatedKey ? `.5` : `1`};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:active { transform: scale(1.05); };    
`
export const PaginateNextBtn = styled.div`
    height: .7em;
    width: .7em;
    background: url('${MEDIA_CDN_HOST}/purple-right-arrow.svg');
    background-size: contain;  
    background-repeat: no-repeat;    
    background-position: center;
`

export const PaginateBackWrapper = styled.div`
    padding: 10px;
    border-radius: 50%;
    border: ${props => props.page !== -1 ? `1px solid ${colors.darkPurple};` : `1px solid ${colors.darkGrey};`};
    opacity: ${props => props.page !== -1 ? `1` : `.5`};
    display: flex;
    align-items: center;
    justify-content: center;    
    margin-right: 1em;
    cursor: pointer;
    &:active { transform: scale(1.05); };    
`
export const PaginateBackBtn = styled.div`
    height: .7em;
    width: .7em;
    background: url('${MEDIA_CDN_HOST}/white-left-arrow.svg'), transparent;  
    background-size: contain;   
    background-repeat: no-repeat;
    background-position: center;
`

export const ArtistWrapper = styled.div`
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:active { transform: scale(1.05); };
    &:hover { opacity:.9; };
`

export const ArtistImage = styled.div`
    width: 6em;
    height: 6em;
    border-radius: 8px;
    background-image: url('${props => props.image}');
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
    margin-bottom: 1em;


    @media ${device.laptop} { 
        width: 6em;
        height: 6em;
    }

    @media ${device.laptopL} { 
        width: 7em;
        height: 7em;
    }    
    
    @media ${device.desktop} {
        width: 7em;
        height: 7em;
    }

`

export const ArtistName = styled.div`
    color: ${colors.secondaryLight};
    font-size: .8em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 7.1em;    
`

export const LetterAvatar = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:1em;
    width:6em;
    height:6em;
    text-align:center;
    border-radius:8px;
    background:${colors.secondaryDark};
    vertical-align:middle;
    color:white;
    margin-bottom:1em;
    opacity:.5;
    &:after{
        content:"${props => props.artistName.slice(0, 1)}";
        font-size:1.5em;
    }

    @media ${device.laptop} { 
        width: 6em;
        height: 6em;
    }

    @media ${device.laptopL} { 
        width: 7em;
        height: 7em;
    }    
    
    @media ${device.desktop} {
        width: 7em;
        height: 7em;
    }    
`