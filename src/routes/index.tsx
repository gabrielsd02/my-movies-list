import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import Home from '../pages/Home';

const Drawer = createNativeStackNavigator();

function Routes() {

    const selector = useSelector(state => state);
    // const { authenticated } = selector.auth.authenticated;

    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName={"Home"}
                screenOptions={{
                    contentStyle: {
                        backgroundColor: '#1c243bec'
                    }      
                }}                
            >
                <Drawer.Screen 
                    name={"Home"} 
                    component={Home}
                    options={{
                        headerShown: false,                        
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )

}

export default Routes;