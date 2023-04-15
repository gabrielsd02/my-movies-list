import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';

import {
    Container,    
    ContainerCarousel,
    TextCategoryMovie,
    ContainerListMovies,
    ContainerCategoryMovie
} from './styles'; 
import { Movies } from '../../interfaces/movies';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../routes/navigationTypes';
import CarouselCardItem from '../../components/CarouselCardItem';
import ListMovies from '../../components/ListMovies';
import Loader from '../../components/Loader';
import axios from '../../../api';

function Home() {

    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

    const [pageMoviesPopular, setPageMoviesPopular] = useState(1);
    const [popularMovies, setPopularMovies] = useState({} as Movies);
    const [loadingMoviesPopular, setLoadingMoviesPopular] = useState(false);

    const [pageTopRatedMovies, setPageTopRatedMovies] = useState(1);
    const [topRatedMovies, setTopRatedMovies] = useState({} as Movies);
    const [loadingMoviesTopRated, setLoadingMoviesTopRated] = useState(false);

    const [moviesUpcoming, setMoviesUpcoming] = useState({} as Movies);
    const [loadingMoviesUpcoming, setLoadingMoviesUpcoming] = useState(false);
    

    async function consultMoviesUpcoming() {

        setLoadingMoviesUpcoming(true);

        try {

            const { data } = await axios.get<Movies>("/movie/upcoming", {
                params: {
                    page: 1
                }
            });
            
            setMoviesUpcoming(data);

        } catch(e: any) {
            console.error(e?.response ? e.response: e);
        } finally {
            setLoadingMoviesUpcoming(false);           
        }

    }
    
    async function consultMoviesPopular() {

        setLoadingMoviesPopular(true);

        try {

            const { data } = await axios.get<Movies>("/movie/popular", {
                params: {
                    page: pageMoviesPopular
                }
            });

            if(pageMoviesPopular > 1) {
                setPopularMovies({
                    page: data.page,
                    results: [
                        ...popularMovies.results,
                        ...data.results
                    ],
                    total_pages: data.total_pages,
                    total_results: data.total_results
                });   
            } else {
                setPopularMovies(data);
            }

        } catch(e: any) {
            console.error(e?.response ? e.response: e);
        } finally {
            setLoadingMoviesPopular(false);
        }

    }

    async function consultMoviesTopRated() {

        setLoadingMoviesTopRated(true);

        try {

            const { data } = await axios.get<Movies>("/movie/top_rated", {
                params: {
                    page: pageTopRatedMovies
                }
            });
            
            if(pageTopRatedMovies > 1) {
                setTopRatedMovies({
                    page: data.page,
                    results: [
                        ...topRatedMovies.results,
                        ...data.results
                    ],
                    total_pages: data.total_pages,
                    total_results: data.total_results
                });   
            } else {
                setTopRatedMovies(data);
            }

        } catch(e: any) {
            console.error(e?.response ? e.response: e);
        } finally {
            setLoadingMoviesTopRated(false);         
        }

    }

    useEffect(() => {
        consultMoviesPopular();
    }, [pageMoviesPopular]);

    useEffect(() => {
        consultMoviesTopRated();
    }, [pageTopRatedMovies]);

    useEffect(() => {
        consultMoviesUpcoming();
    }, []);
    
    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator                
                contentContainerStyle={{ 
                    flexGrow: 1, 
                    paddingVertical: 10 
                }}
                style={{ 
                    flex: 1, 
                    width: '100%'
                }}
                keyboardShouldPersistTaps="always"        
            >
                <ContainerCategoryMovie>
                    <TextCategoryMovie>
                        Upcoming
                    </TextCategoryMovie>
                </ContainerCategoryMovie>
                <ContainerCarousel>                    
                    {(!loadingMoviesUpcoming) ? <Carousel 
                        mode={'parallax'}
                        width={Dimensions.get('window').width - 15}
                        height={250}
                        loop                        
                        autoPlay
                        autoPlayInterval={3000}
                        data={moviesUpcoming.results}                        
                        scrollAnimationDuration={1000}
                        renderItem={({ item, index }) => <CarouselCardItem 
                            item={item}
                            index={index}
                            navigation={navigation}
                            numberResults={moviesUpcoming.results.length}
                        />}
                    /> : <ActivityIndicator 
                        color={'white'}
                        size={30}                        
                    />}
                </ContainerCarousel>
                <ContainerCategoryMovie>
                    <TextCategoryMovie>
                        Popular
                    </TextCategoryMovie>
                </ContainerCategoryMovie>
                <ContainerListMovies>
                    <ListMovies 
                        data={popularMovies}
                        loading={loadingMoviesPopular}
                        page={pageMoviesPopular}          
                        navigation={navigation}          
                        setPage={setPageMoviesPopular}                        
                    />
                </ContainerListMovies>
                <ContainerCategoryMovie>
                    <TextCategoryMovie>
                        Top Rated
                    </TextCategoryMovie>
                </ContainerCategoryMovie>
                <ContainerListMovies>
                    <ListMovies 
                        data={topRatedMovies}
                        loading={loadingMoviesTopRated}
                        page={pageTopRatedMovies}             
                        navigation={navigation}          
                        setPage={setPageTopRatedMovies}                        
                    />
                </ContainerListMovies>
            </ScrollView>
        </Container> 
    )

}

export default Home;