import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

import {
    Title,
	PageText,
	Container,
	TextListEmpty,
	ContainerList,
	InputContainer,
	PaginationBoxArrow,
    TextGenre,
	ContainerPagination,
    ContainerGenresMovie,
    BackgroundGenre
} from './styles';
import { GenresMovies, Movies } from '../../interfaces/movies';
import { RootDrawerParamList } from '../../routes/navigationTypes';
import Loader from '../../components/Loader';
import PaginationList from '../../components/PaginationList';
import ListMovies from '../../components/ListMovies';
import axios from '../../../api';

interface CategoryMoviesProps {
    navigation: DrawerNavigationProp<RootDrawerParamList, 'CategoryMovies'>;
    route: RouteProp<RootDrawerParamList, 'CategoryMovies'>;
}

interface GenresAvailableProps extends GenresMovies {
    selected?: boolean;
}

function CategoryMovies({ 
    route, 
    navigation 
}: CategoryMoviesProps) {

    const [loading, setLoading] = useState(false);
    const [loadingMovies, setLoadingMovies] = useState(false);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState({} as Movies);
    const [selectedGenres, setSelectedGenres] = useState<GenresMovies[]>([]);
    const [genresAvailable, setGenresAvailable] = useState<GenresAvailableProps[]>([]);

    async function consultGenresAvailable() {

        setLoading(true);

        try {

            const { data } = await axios.get<{genres: GenresMovies[]}>('/genre/movie/list');
            setGenresAvailable(data.genres);

        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

    }    

    async function consultMovieByGender() {

        setLoadingMovies(true);

        try {            

            const idsGenre = mountIdsGenre();            
            const { data } = await axios.get<Movies>('/discover/movie', {
                params: {
                    page,
                    with_genres: idsGenre
                }
            });
            setMovies(data);
            
        } catch(e) {
            console.error(e);
        } finally {
            setLoadingMovies(false);
        }

    }

    function mountIdsGenre() {

        let idsString = '';

        selectedGenres.map((genre, index) => {

            const idGenre = genre.id.toString();
            const lastElement = index === selectedGenres.length - 1;            
            idsString += idGenre + ',';

        });        

        return idsString;

    }

    const ListEmpty = () => {
		return (!loadingMovies) ? <View style={{ marginTop: 20 }}>
			<TextListEmpty>
				{(movies && movies.total_results === 0) ? 'Not found records :(' : 'The list is empty'}
			</TextListEmpty>
		</View> : <></>
	}

    useEffect(() => {
        consultGenresAvailable();
    }, [route]);

    useEffect(() => {
        if(selectedGenres.length > 0) {
            consultMovieByGender();
        } else {
            setMovies({} as Movies);
        }
    }, [selectedGenres, page]);
    
    if(loading) {
        return <Loader />
    }

    return (
        <Container>		
            <ScrollView
                showsVerticalScrollIndicator                
                contentContainerStyle={{ 
                    flexGrow: 1, 
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                style={{ 
                    flex: 1, 
                    width: '100%'
                }}
                keyboardShouldPersistTaps="always"      
            >
                <InputContainer>
                    <Title>
                        Select Genres to Search Movies
                    </Title>
                    <ContainerGenresMovie>
                        {(genresAvailable && genresAvailable.map((genre, index) => {       

                            const isSelected = selectedGenres.some((genreSelected) => genreSelected.id === genre.id);
                            
                            return <BackgroundGenre
                                key={index}
                                style={{
                                    backgroundColor: isSelected ? 'black' : 'transparent',
                                    opacity: isSelected ? 1 : 0.5
                                }}
                                onPress={() => {              

                                    if(!isSelected) {
                                        setSelectedGenres(selectedGenres.concat(genre));
                                    } else {
                                        setSelectedGenres(
                                            selectedGenres.filter((genreSelect) => genreSelect.id !== genre.id)
                                        );
                                    }

                                }}
                            >
                                <TextGenre
                                    style={{
                                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                        textShadowOffset: {
                                            width: 1, 
                                            height: 1
                                        },
                                        textShadowRadius: 10,
                                    }}
                                >
                                    {genre.name}
                                </TextGenre>
                            </BackgroundGenre>
                        }))}
                    </ContainerGenresMovie>
                </InputContainer>	                
                <ContainerList 
                    style={{				                        	
                        backgroundColor: (
                            !movies.results || 
                            movies.results.length === 0 
                        ) ? 'transparent' : 'rgba(0, 0 , 0, 0.3)'
                    }}
                >
                    <ListMovies 
                        data={movies as Movies}
                        loading={loadingMovies}
                        numberOfColumns={2}
                        horizontal={false}
                        componentListEmpty={ListEmpty}
                        functionRefresh={consultMovieByGender}
                        lastRoute={'CategoryMovies'}
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
                        page={1}
                    />
                </ContainerList>
                {(movies.results && movies?.results?.length > 0) && (
                    <PaginationList 
                        page={page}
                        setPage={setPage}
                        totalPages={movies.total_pages}
                    />
                )}
            </ScrollView>	
		</Container>
    )
}

export default CategoryMovies;