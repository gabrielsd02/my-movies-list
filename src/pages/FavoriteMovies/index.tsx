import React, { useCallback, useState } from 'react'
import { Alert, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Title,
    Container, 
    ContainerList,
    TextListEmpty
} from './styles';
import { RootDrawerParamList } from '../../routes/navigationTypes';
import Loader from '../../components/Loader';
import { MovieInfoProps, Movies } from '../../interfaces/movies';
import ListMovies from '../../components/ListMovies';

interface FavoritesMoviesProps {
    navigation: DrawerNavigationProp<RootDrawerParamList, 'Favorites'>;
    route: RouteProp<RootDrawerParamList, 'Favorites'>;
}

function FavoriteMovies({
    navigation
}: FavoritesMoviesProps) {

    const [loading, setLoading] = useState(false);
    const [favorieMovies, setFavoriteMovies] = useState({} as Movies);

    async function consultFavorites() {
        
        setLoading(true);

        try {
            
            const favoritesMoviesStringify = await AsyncStorage.getItem("@my-movies-list:favorites-movies");                    
            if(favoritesMoviesStringify) {

                const favoritesMoviesCache = JSON.parse(favoritesMoviesStringify) as MovieInfoProps[];                                                                                
                setFavoriteMovies({
                    page: 1,
                    results: favoritesMoviesCache as Movies['results'],                    
                    total_pages: 1,
                    total_results: favoritesMoviesCache.length
                });              

            }

        } catch(e: any){
            console.error(e);
            Alert.alert("Error!", e.message ? e.message : "There was a error when performing the function of consult favorites movies. Please, clean the cache and try again.")
        } finally {
            setLoading(false);
        }        

    }

    const ListEmpty = () => {
		return (!loading) ? <View style={{ marginTop: 20 }}>
			<TextListEmpty>
				{(favorieMovies && favorieMovies.total_results === 0) ? 'Not found records :(' : 'The list is empty'}
			</TextListEmpty>
		</View> : <></>
	}

    useFocusEffect(
        useCallback(() => {
          consultFavorites();
        }, [])
    );
    
    if(loading) {
        return <Loader />
    }
    
    return (
        <Container>
            <Title>
                Favorites Movies
            </Title>
            <ContainerList
                style={{				                        	
                    backgroundColor: (
                        !favorieMovies.results || 
                        favorieMovies.results.length === 0 
                    ) ? 'transparent' : 'rgba(0, 0 , 0, 0.3)'
                }}
            >
                <ListMovies 
                    data={favorieMovies}
                    loading={loading}
                    numberOfColumns={2}
                    horizontal={false}
                    componentListEmpty={ListEmpty}
                    functionRefresh={consultFavorites}
                    lastRoute={'Favorites'}
                    styleItem={{
                        width: 150,
                        height: 250,
                        margin: 0,
                        marginBottom: 20,
                        padding: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    navigation={navigation}
                />
            </ContainerList>
        </Container>
    )
}

export default FavoriteMovies;