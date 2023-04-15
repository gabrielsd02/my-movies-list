import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserState } from '../store/interfaceStore';
import { setSignIn } from '../store';
import SignIn  from '../pages/SignIn';
import AppRoutes from './app.routes';

function Routes() {
    
	const selector = useSelector((state: UserState) => state);
	const dispatch = useDispatch();
	const [checking, setChecking] = useState(false);
	
	const isAuthenticated = selector.authenticated;	
	
	async function verifyLoginCache() {

		setChecking(true);

		try {

			await SplashScreen.preventAutoHideAsync();
			const userCache = await AsyncStorage.getItem("@my-movies-list:user");
			
			if(userCache) {
				const user = JSON.parse(userCache);
				dispatch(
					setSignIn({
						authenticated: true,
						user: user.user
					})
				);
			};

		} catch(e) {
			console.error(e);
		} finally {
			setChecking(false);
			await SplashScreen.hideAsync();
		}

	}

	useEffect(() => {
		verifyLoginCache();
	}, []);

	return (
		(!checking) ? (
			<NavigationContainer>
				{
					isAuthenticated ?  
					<AppRoutes /> : 
					<SignIn />
				}
			</NavigationContainer>
		) : <></>
	)

}

export default Routes;