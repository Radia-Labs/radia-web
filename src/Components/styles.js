import styled from 'styled-components';
import {colors} from '../constants';

export const Layout = styled.div`
  padding: 4rem;
`
export const Header = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 4rem;
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
    font-size: 1.2rem;
    line-height: 1.2rem;
    font-weight: 700;
    color: ${colors.primaryLight};
`

export const GradientButton = styled.button`
    border: none;
    border-radius: 30px;
    padding: 0.5rem 3rem;
    background:  ${props => props.background || `linear-gradient(216.56deg, ${colors.darkPurple}, ${colors.darkMagenta})`}; 
    font-size: .8rem;
    font-weight: 700;
    line-height: .8rem;
    color: ${colors.primaryLight};
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover { transform: scale(1.05); }
`

export const SpotifyModalImage = styled.div`
    background-image: url('${window.location.origin}/spotify-logo.svg');
    height: 20%;
    width: 120px;  
    background-size: contain;
    background-repeat: no-repeat;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast;
`