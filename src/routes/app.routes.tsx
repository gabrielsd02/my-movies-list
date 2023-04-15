import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { 
    DrawerItemList, 
    createDrawerNavigator,
    DrawerContentScrollView, 
    DrawerContentComponentProps,
    DrawerNavigationOptions
} from '@react-navigation/drawer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../pages/Home';
import Search from '../pages/Search';
import CategoryMovies from '../pages/CategoryMovies';
import MovieDetails from '../pages/MovieDetails';
import Header from '../components/Header';
import { 
    TextLogout,
    TitleDrawer,
    ContainerLogout,
    ContainerTitleDrawer,
    ContainerIconTextLogout,
    HeaderDrawerItems
} from './styles';
import { RootDrawerParamList } from './navigationTypes';
import { setSignOut } from '../store';
import { UserState } from '../store/interfaceStore';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function AppRoutes() {

    const selector = useSelector((state: UserState) => state);
    const dispatch = useDispatch();

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

    async function logOut() {
        await AsyncStorage.removeItem("@my-movies-list:user");
        dispatch(setSignOut());
    }
    
    function CustomDrawerContent(props: DrawerContentComponentProps) {
        
        return (
            <HeaderDrawerItems>
                <ContainerTitleDrawer>
                    <TitleDrawer numberOfLines={1}>
                        Welcome!
                    </TitleDrawer>
                    <TitleDrawer numberOfLines={1}>
                        {selector.user}
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
                    <TouchableOpacity 
                        style={{ paddingVertical: 5 }}
                        activeOpacity={0.4}
                        onPress={logOut}
                    >
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
            </HeaderDrawerItems>
        );

    }

    return (
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
                    drawerItemStyle: {
                        marginTop: -5
                    },  
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
                name={"CategoryMovies"}
                component={CategoryMovies}                    
                options={{
                    header: (props) => <Header {...props} />,
                    drawerLabel: 'Categories',                                                     
                    drawerIcon: ({ size, color }) => <FontAwesome 
                        color={color}
                        size={size}
                        name={'bars'}
                        style={{
                            marginTop: 2
                        }}
                    />
                }}                    
            />
            <Drawer.Screen 
                name={"MovieDetails"}
                component={MovieDetails}
                initialParams={{ id: undefined }}                    
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
    )

}

export default AppRoutes;