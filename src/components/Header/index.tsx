import { DrawerHeaderProps } from '@react-navigation/drawer';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
    Topbar,
    TextNameApp,
    ContainerNameApp,
    IconPressableContainer
} from './styles'

function Header(props: DrawerHeaderProps) {
    
    return (
        <Topbar>
            <IconPressableContainer
                onPress={() => props.navigation.toggleDrawer()}
            >                    
                <FontAwesome 
                    color={'white'}
                    size={26}
                    name='bars'
                />
            </IconPressableContainer>
            <ContainerNameApp>
                <FontAwesome 
                    name={'video-camera'}
                    size={30}
                    color={'orange'}
                />
                <TextNameApp>
                    MyMoviesList
                </TextNameApp>
            </ContainerNameApp>
        </Topbar>
    );

}

export default Header;