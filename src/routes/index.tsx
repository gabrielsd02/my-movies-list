import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { 
    DrawerItemList, 
    createDrawerNavigator,
    DrawerContentScrollView, 
    DrawerContentComponentProps,
    DrawerNavigationOptions
} from '@react-navigation/drawer';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Movie from '../pages/Movie';
import Header from '../components/Header';
import { 
    TextLogout,
    TitleDrawer,
    ContainerLogout,
    ContainerTitleDrawer,
    ContainerIconTextLogout
} from './styles';

const Drawer = createDrawerNavigator();

function Routes() {

    const selector = useSelector(state => state);
    // const { authenticated } = selector.auth.authenticated;

    const screenNavigatorOption = {
        sceneContainerStyle: {
            backgroundColor: '#1c243bec'
        },                    
        drawerStatusBarAnimation: 'slide',
        drawerPosition: 'left',
        drawerActiveTintColor:'white',
        drawerInactiveTintColor:'gray',
        drawerStyle: {
            backgroundColor: '#221e1e'
        },
        drawerLabelStyle: {
            marginLeft: -15,
            fontSize: 20,
            fontWeight: 'bold'
        }
    } as DrawerNavigationOptions;

    function CustomDrawerContent(props: DrawerContentComponentProps) {
        
        return (
            <View style={{ flex: 1 }}>
                <ContainerTitleDrawer>
                    <TitleDrawer>
                        MyMoviesList
                    </TitleDrawer>
                </ContainerTitleDrawer>
                <DrawerContentScrollView 
                    {...props}                    
                >
                    <DrawerItemList 
                        {...props}                       
                    />            
                </DrawerContentScrollView>
                <ContainerLogout>
                    <TouchableOpacity style={{ paddingVertical: 5 }}>
                        <ContainerIconTextLogout>
                            <FontAwesome 
                                name='sign-out'
                                size={26}                    
                                color={'white'}
                            />
                            <TextLogout>
                                Sign Out
                            </TextLogout>
                        </ContainerIconTextLogout>
                    </TouchableOpacity>
                </ContainerLogout>
            </View>
        );

    }

    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                initialRouteName={"Home"}                
                screenOptions={{...screenNavigatorOption}}                                 
            >
                <Drawer.Screen 
                    name={"Home"} 
                    component={Home}
                    options={{     
                        header: (props) => <Header {...props} />,
                        drawerLabel: 'Home',                                                     
                        drawerIcon: ({ size, color }) => <FontAwesome 
                            color={color}
                            size={size}
                            name={'home'}
                            style={{
                                marginTop: 2
                            }}
                        />                 
                    }}
                />
                <Drawer.Screen 
                    name={"Search"}
                    component={Search}
                    options={{
                        header: (props) => <Header {...props} />,
                        drawerLabel: 'Search',                                                     
                        drawerIcon: ({ size, color }) => <FontAwesome 
                            color={color}
                            size={size}
                            name={'search'}
                        />
                    }}
                />
                <Drawer.Screen 
                    name={"MovieDetails"}
                    component={Movie}
                    initialParams={{ id: null }}                    
                    options={{                        
                        header: (props) => <Header {...props} />,
                        drawerItemStyle: {
                            height: 0,
                            width: 0
                        },
                        drawerLabel: ''                    
                    }}                    
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )

}

export default Routes;