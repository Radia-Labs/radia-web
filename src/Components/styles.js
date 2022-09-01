import styled, {keyframes} from 'styled-components';
import {MEDIA_CDN_HOST, colors, device, size} from '../constants';

export const Layout = styled.div`
  padding: 5rem 5rem;

  @media (max-width: ${size.mobileL}) { 
    padding: 1.5em 1.5em;
  }   
`
export const Header = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 5rem;
    background-color: ${colors.secondaryDark};

    @media (max-width: ${size.mobileL}) { 
        padding: 0.5rem 1.5rem;
      }       
`  

export const LogoWrapper = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    flex-wrap: no-wrap; 
    align-items: baseline;
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
    font-weight: ${props => props.fontWeight || '700'}; 
    color:  ${props => props.color || colors.primaryLight}; 
    margin: ${props => props.margin || 'none'};       
`
export const Text = styled.span`
    font-size: ${props => props.fontSize || '1.2rem'}; 
    font-weight: ${props => props.fontWeight || '700'}; 
    color:  ${props => props.color || colors.primaryLight}; 
    cursor: ${props => props.cursor || "inherit"}; 
    margin: ${props => props.margin || 'none'}; 
    transition: all .2s ease-in-out;
    &:hover {
        opacity: ${props => props.cursor ? '.7' : '1'};
    }
`

export const Button = styled.button`
    border: none;
    border-radius: 30px;
    padding: ${props => props.padding || '0.5rem 3rem'};
    background:  ${props => props.background || `linear-gradient(216.56deg, ${colors.darkMagenta}, ${colors.darkPurple})`}; 
    border:  ${props => props.border || 'none'}; 
    width: ${props => props.width || 'auto'};
    font-size: .8rem;
    font-weight: 700;
    line-height: .8rem;
    color: ${colors.primaryLight};
    cursor: pointer;
    transition: all .2s ease-in-out;
    margin: ${props => props.margin || 'none'}; 
    white-space: nowrap;
    opacity: ${props => props.disabled ? '.5' : '1'};
        
    &:hover { opacity: ${props => props.disabled ? '.5' : '.9'}; };
    &:active { transform: scale(1.05); };
`

export const Input = styled.input`
    width: -webkit-fill-available;
    border-radius: 30px;
    padding: ${props => props.padding || '0.5rem 1.5rem'};
    background:  ${props => props.background || colors.primaryLight};
    border:  ${props => props.border || 'none'};
    margin: ${props => props.margin || 'none'};
`

export const Box = styled.div`
    margin: ${props => props.margin || 'none'};
    padding: ${props => props.padding || 'none'};
    text-align: ${props => props.textAlign || 'none'};
    border: ${props => props.border || 'none'};
    border-radius: ${props => props.borderRadius || 'none'};
`

export const Select = styled.select`
  width: 100%;
  border-radius: 30px;
  border: none;
  background: white;
  color: gray;
  padding: ${props => props.padding || '0.5rem 1.5rem'};
  margin-bottom:1em;

  option {
    color: ${colors.primaryDark};
  }
`;

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

export const ProgressCard = styled.div`
    background-color: ${colors.secondaryDark};
    border-radius: 20px;  
    padding: 1em; 
    margin-bottom: 1em;
    margin-right: 1em;
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover { opacity:.9; };
    
    @media (max-width: ${size.mobileL}) { 
        flex-basis: 100%;
        margin-right: 0;
      }     

    @media ${device.laptop} { 
        width: 16.2em;
        height: 22em;
    }

    @media ${device.laptopL} { 
        width: 17.5em;
        height: 22.5em;
    }    
    
    @media ${device.desktop} {
        width: 20em;
        height: 22.5em;
    }

`


export const SimilarArtistWrapper = styled.div`
    margin: 0 0 5em 0;

    @media (max-width: ${size.mobileL}) { 
        text-align: center;
      }       
`

export const SimilarArtistTitle = styled.div`
    color: ${colors.primaryLight};
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1em;     
`

export const SimilarArtistCard = styled.div`
    width: 16.2em;
    height: 17em;
    background-color: ${colors.secondaryDark};
    border-radius: 20px;  
    padding: 1em; 
    margin-bottom: 1em; 
    margin-right: 1em;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;         
    transition: all .2s ease-in-out;
    &:hover { opacity:.9; };    

    @media (max-width: ${size.mobileL}) { 
        flex-basis: 100%;
        margin-right: 0;
      }         

    @media ${device.laptop} { 
        width: 16.2em;
        height: 17em;
    }

    @media ${device.laptopL} { 
        width: 17.5em;
        height: 17.5em;
    }    
    
    @media ${device.desktop} {
        width: 20em;
        height: 17.5em;
    }

`

export const CollectibleCard = styled.div`
    background-color: ${colors.secondaryDark};
    border-radius: 20px;  
    padding: 1em; 
    margin-bottom: 1em; 
    cursor: pointer;
    border: ${props => props.isSelected ? `1px solid ${colors.darkPurple}` : 'none'};
    transition: all .2s ease-in-out;
    &:hover { opacity:.9; };

    @media (max-width: ${size.mobileL}) { 
        flex-basis: 100%;
      }         

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
    filter: ${props => props.filter || 'none'};
     

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
    transition: all .2s ease-in-out; 
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
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover { opacity:.9; };
`

export const CollectorLabel = styled.div`
    color: ${colors.lightGrey};
    font-size: .8em;
`

export const CollectorName = styled.div`
    color: ${colors.secondaryLight};
    font-size: .8em;
    &:hover { opacity:.9; };  
    cursor: pointer;       
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;       
`

export const CollectorWrapper = styled.div`
    width:40%;
    margin: auto 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;        
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
  display: inline-block;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 1px solid ${colors.lightGrey};
  border-right: 1px solid ${colors.lightGrey};
  border-bottom: 1px solid ${colors.lightGrey};
  border-left: 2px solid ${colors.lightGrey};
  background: transparent;
  width: .8em;
  height: .8em;
  border-radius: 50%;
`

export const PaginateNextWrapper = styled.div`
    padding: 10px;
    border-radius: 50%;
    background-color: ${colors.primaryLight};
    opacity: ${props => props.disabled ? `.5` : `1`};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:active { transform: scale(1.05); };    
`


export const ArtistsPaginateNextWrapper = styled.div`
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

export const ArtistsPaginateBackWrapper = styled.div`
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

export const PaginateBackWrapper = styled.div`
    padding: 10px;
    border-radius: 50%;
    border: ${props => props.disabled ?  `1px solid ${colors.darkGrey};` : `1px solid ${colors.darkPurple};`};
    opacity: ${props => props.disabled ? `.5` : `1`};
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
    background-size: cover;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
    margin-bottom: 1em;
    margin: 0px 30px 20px 0px;


    @media (max-width: ${size.mobileL}) { 
        margin: 0px 15px 20px 0px;
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

export const ArtistName = styled.div`
    color: ${colors.secondaryLight};
    font-size: .8em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 7.1em;    
`

export const LetterCollectibleImage = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:1em;
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
    background:${props => props.filter ? colors.lightGrey : colors.primaryDark};
    vertical-align:middle;
    color:white;
    margin-bottom:1em;
    opacity:.5;
    filter: ${props => props.filter || 'none'};
    &:after{
        content:"${props => props.artistName.slice(0, 1)}";
        font-size:1.5em;
    }   
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
export const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 12em;
    border-radius: 12px;
    background-color: ${colors.secondaryDark};
    margin-bottom: 5em;

    @media (max-width: ${size.mobileL}) { 
        display: block;
        width: 100%;
        height: 100%;
        padding-top: 1em;
    }    
`

export const ProfileImage = styled.div`
    width: 8em;
    height: 8em;
    border-radius: 8px;
    border: none;
    margin-left: 2em;
    background-image: url('${props => props.image}');
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;

    @media (max-width: ${size.mobileL}) { 
        margin:0 auto;
        margin-bottom: 1em;
        top: 1em;
        border-radius: 50%;
        border: 2px solid ${colors.primaryLight};
    }     
`

export const ProfileHeaderWrapper = styled.div`
    display: flex;
    margin: 0 0 0 2em; 
    flex-direction:row; 
    flex-grow:1; 
    justify-content:space-between; 
    alignItems:center;

    @media (max-width: ${size.mobileL}) { 
        display: block;
        text-align: center;
        margin: 1.5em;
    }
`
export const ProfileUserWrapper = styled.div`
    display: flex;
    margin: 0 0 0 2em; 
    flex-direction:column; 
    justify-content:space-between; 
    alignItems:center;

    @media (max-width: ${size.mobileL}) { 
        display: block;
        margin: 0;
    }    
`

export const LetterProfileImage = styled.div`
    margin-left: 2em;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:1em;
    width: 8em;
    height: 8em;
    border-radius: 20px;
    margin-bottom: 1em;
    background-size: cover;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast; 
    background:${colors.primaryDark};
    vertical-align:middle;
    color:white;
    opacity:.5;
    &:after{
        content:"${props => props.artistName.slice(0, 1)}";
        font-size:1.5em;
    }  
    
    @media (max-width: ${size.mobileL}) { 
        margin:0 auto;
        margin-bottom: 1em;
        top: 1em;
        border-radius: 50%;
        border: 2px solid ${colors.primaryLight};
    }  

`

export const ArtistPorifileWrapper = styled.div`
    display: flex;
    margin: 0 0 0 2em;
    flexDirection: row;
    flexGrow: 1;
    justifyContent: space-between;
    alignItems: center;

    @media (max-width: ${size.mobileL}) {
        display: block;
        margin: 0 auto;
        width: 100%;

        & > div {
            margin: 0;
            justify-content: space-around;
        }
        & > :first-child {
            
            text-align: center;
            display: block;
        }
    }
`

export const ProfileUserName = styled.div`
    font-size: 1.2em;
    color: ${colors.primaryLight};
    font-weight: 700;
    margin-bottom: .5em;
`
export const ProfileWalletWrapper = styled.div`

    @media (max-width: ${size.mobileL}) { 
        display: block;
    }
`

export const ProfileWalletAddress = styled.div`
    font-size: .8em;
    color: ${colors.lightGrey};
    background-color: ${colors.secondaryLight};
    padding: .5em 1.5em;
    border-radius: 12px;
    transition: all .2s ease-in-out;
    margin-bottom: 1em;
    text-align: center;
    &:hover { opacity:.9; };
    &:active { transform: scale(1.05); };      
    cursor: pointer;    
`

export const CopyIcon = styled.div`
    margin-left: .5em;
    display: inline-block;
    height: .75em;
    width: .75em;
    background: url('${MEDIA_CDN_HOST}/copy-icon.svg'), transparent;  
    background-size: contain;   
    background-repeat: no-repeat;
    background-position: center;
`

export const ProfileDetailsWrapper = styled.div`
    display: flex;
    margin: 0 2em 0 2em;
    flex-direction: row;
    flex-grow: .5;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${size.mobileL}) { 
        margin: 0;
        & > div {
            margin: 1em 0;

            & > h1 {
                padding-bottom: .3em;
                font-size: .8em;
                margin: 0;
            }            
        }
    }    
`

export const TopFansWrapper = styled.div`
    margin-bottom: 5em;
`

export const FanWrapper = styled.div`
    display: flex;
    align-items: flex-start; 
    justify-content: flex-start;
    margin: 0 0 1em 0;

    @media (max-width: ${size.mobileL}) { 
        display: block;  
    }
`

export const FanCard = styled.div`
    background-color: ${colors.secondaryDark};
    border-radius: 14px;  
    padding: 1em; 
    display:  flex;
    width: ${props => props.width || `10%`};
    justify-content: flex-start;
    margin: ${props => props.margin || `0`};

    @media (max-width: ${size.mobileL}) { 
        margin: 0;
        width: 90%;
        margin-bottom:1em;
    }    
`

export const FanImage = styled.img`
    width: 2.1em;
    height: 2.1em;
    border-radius: 8px;
    background-image: url(${({ percent }) => percent}%;');
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
    margin-right: 1em;
`

export const FanNameWrapper = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;   
`

export const FanName = styled.div`
    font-size: .8em;
    color: ${props => props.color || colors.lightGrey}; ;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;      
 
`

export const ProgressBarContainer = styled.div`
  height: 1em;
  width: ${props => props.width || `100%`};
  position: relative;
  margin-right:10px;
`;

export const ProgressBaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 12px;
  transition: width 1s ease-in-out;
`;

export const ProgressBarBackground = styled(ProgressBaseBox)`
  background: grey;
  width: 100%;
`;

export const Progress = styled(ProgressBaseBox)`
  background: ${colors.seaGreen};
  width: ${({ percent }) => percent}%;
`;

export const CollectibleDetailsWrapper = styled.div`
    display: flex;
    margin: 0 10em 5em;

    @media (max-width: ${size.mobileL}) { 
        display: block;
        width: inherit;
        margin: 0 0 5em;        
    }   
`

export const CollectibleDetailsImage = styled.img`
    width: 28em;
    height: 28em;
    border-radius: 8px;
    margin-bottom: .5em;

    @media (max-width: ${size.mobileL}) { 
        width: 100%;
        height: 100%;
    }       
`

export const CollectibleTextWrapper = styled.div`
    flex-direction: column;
    margin: 0 0 0 3em;
    align-items: flex-start;
    display:flex;
    

    @media (max-width: ${size.mobileL}) { 
        display: block;
        margin: 1em 0 0 0;
        justify-content: center;
        align-items: center;
    }
`

export const CollectibleTitle = styled.div`
    font-size: 2em;
    margin-bottom: 1em;
    color: ${colors.primaryLight};
    font-weight: 700;

    @media (max-width: ${size.mobileL}) { 
        font-size: 1.5em;
        text-align: center;
    }
`


export const CollectibleDetailsOwner = styled.div`
    background-color: ${colors.secondaryDark};
    border-radius: 14px;  
    padding: 1em; 
    display:  flex;
    width: 10%;
    justify-content: flex-start;
`

export const NFTDetailsWrapper = styled.div`
    border-radius: 8px;
    background-color: ${colors.secondaryDark};
    padding: 1em;
    margin: ${props => props.margin || `0`};
    width: 40%;
    overflow: hidden;
    white-space: nowrap;
  
`

export const CollectionWrapper = styled.div`
    border-radius: 1em;
    background-color: ${colors.secondaryDark};
    padding: 1em;
    margin: 0 1em 1em 0;
    width: 25em;
    max-height: 25em;

    @media (max-width: ${size.mobileL}) { 
        margin: 0;
        width: 100%;
        margin-bottom:1em;
    }       
`
export const CollectionItem = styled.div`
    width: 6em;
    height: 6em;
    border-radius: 6px;
    background-image: url('${props => props.image}');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
    margin: 0 .5em .5em 0;
    flex: 1 1 7em;
`

export const FixedFooter= styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: ${props => props.show ? '1' : `0`};
    border-top: 1px solid ${colors.lightGrey};
    background-color: ${colors.secondaryDark};
    padding: 1em;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 4em;
    width: 100%;
    transition: all .2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;    
`


export const StyledBurger = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 1.5rem;
    height: 0.15rem;
    background-color: ${({ open }) => open ? colors.primaryLight : colors.primaryLight};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

export const MobileNavUl = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 1em 1em 1em 2em;
    border-bottom: 1px solid rgba(242,243,245, 0.1);
  }
  @media (${device.mobileS}) {
    flex-flow: column nowrap;
    background-color: ${colors.primaryDark};
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    margin-top:0;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    z-index:19;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }

  
`;