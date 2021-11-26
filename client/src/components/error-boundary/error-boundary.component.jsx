import React from 'react';
import { StyledErrorContainer, StyledErrorImage, StyledErrorTitle, StyledErrorText } from './error-boundary.styles'

class ErrorBoundary extends React.Component {

    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    // Cualquier error en los hijos
    static getDerivedStateFromError(error) {
        return { hasErrored: true }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <StyledErrorContainer>
                    <StyledErrorImage imageUrl='https://i.imgur.com/FOeYt4E.png'></StyledErrorImage>
                    <StyledErrorTitle>This Page is Buried in the Sand</StyledErrorTitle>
                    <StyledErrorText>You have never seen an ostrich head. Whenever you’re around it seems ostriches are avoiding your gaze.
                        You came on this trip specifically to see an ostrich head, but here is this ostrich right in front of you, head invisible. You may never see an ostrich head.</StyledErrorText>
                </StyledErrorContainer>
            )
        }

        return this.props.children;
    }

}

export default ErrorBoundary;