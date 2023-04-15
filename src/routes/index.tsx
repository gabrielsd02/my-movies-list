import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserState } from '../store/interfaceStore';
import { setSignIn } from '../store';
import SignIn  from '../pages/SignIn';
import AppRoutes from './app.routes';

function Routes() {
    
	const selector = useSelector((state: UserState) => state);
	const dispatch = useDispatch();
	const isAuthenticated = selector.authenticated;
	
	async function verifyLoginCache() {

		try {
			
			const userCache = await AsyncStorage.getItem("@my-movies-list:user");
			if(userCache) {
				const user = JSON.parse(userCache);
				dispatch(
					setSignIn({
						authenticated: true,
						user
					})
				);
			};

		} catch(e) {
			console.error(e);
		}

	}

	useEffect(() => {
		verifyLoginCache();
	}, [])

	return (
		<NavigationContainer>
			{
				isAuthenticated ?  
				<AppRoutes /> : 
				<SignIn />
			}
		</NavigationContainer>
	)

}

export default Routes;