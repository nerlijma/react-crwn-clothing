
import styled from 'styled-components';

export const StyledErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const StyledErrorImage = styled.div`
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
    background-position: center;
    background-size: cover;
    width: 40vh;
    height: 40vh;    
`

export const StyledErrorTitle = styled.h2`
    
`

export const StyledErrorText = styled.h3`
`


