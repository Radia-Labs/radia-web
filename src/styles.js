import styled, { createGlobalStyle } from 'styled-components';
import {colors} from './constants';
import Modal from 'styled-react-modal'


export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.primaryDark};
    
  }
  body, input, textarea, button {
    font-family: 'Urbanist', sans-serif;
  }
`

export const Flex = styled.div`
 position: relative;
  display: flex;
  justify-content: ${props => props.justifyContent || 'space-between'};
  align-items: ${props => props.alignItems || 'center'};
  flex-direction: ${props => props.flexDirection || 'row'};
  flex-wrap: ${props => props.flexWrap || 'wrap'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
`

export const StyledModal = Modal.styled`
  border-radius: 4px;
  width: 25rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.secondaryDark};
`