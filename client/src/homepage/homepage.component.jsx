import Directory from '../components/directory/directory.component';
import { HomePageContainer } from './homepage.styles';

// simport './homepage.styles.scss'

const HomePage = () => {
    // throw new Error('hola');
    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    )
}

export default HomePage;