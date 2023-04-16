import { DrawerHeaderProps } from '@react-navigation/drawer';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
    Topbar,
    TextNameApp,
    ContainerIcons,
    ContainerNameApp,
    IconPressableContainer
} from './styles'

interface RouteParams {
    lastRoute?: string;
}

function Header(props: DrawerHeaderProps) {
    
    const isHome = props.route && props.route.name === 'Home';

    const handleBack = () => {

        const navigation = props.navigation;

        if(props.route && props.route.params) {

            const params: RouteParams = props.route.params;            
            const lastRoute = params.lastRoute;
            if(lastRoute) {
                return navigation.navigate(lastRoute);
            }

        }

        if(navigation.canGoBack()) navigation.goBack();

    };
    
    return (
        <Topbar>    
            <ContainerIcons>                
                <IconPressableContainer
                    onPress={() => props.navigation.toggleDrawer()}
                >                    
                    <FontAwesome 
                        color={'white'}
                        size={32}
                        name='bars'
                    />
                </IconPressableContainer>
                {(!isHome) && (
                    <IconPressableContainer
                        onPress={handleBack}
                    >                    
                        <FontAwesome 
                            color={'white'}
                            size={32}
                            name='arrow-circle-left'
                        />
                    </IconPressableContainer>
                )}
            </ContainerIcons>        
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