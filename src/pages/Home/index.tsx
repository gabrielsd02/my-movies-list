import { useEffect, useState, useRef } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
import useIsMounted from 'ismounted';

import axios from '../../../api';
import {
    Container,
    ContainerCarousel,
    TextCategoryMovie,
    ContainerListMovies,
    ContainerCategoryMovie
} from './styles';
import { Movies } from '../../interfaces/home';
import CarouselCardItem from '../../components/CarouselCardItem';
import ListMovies from '../../components/ListMovies';

interface ItemList {
    item: Movies['results'][0];
    index: number;
}

function Home() {

    const mounted = useRef(false);
    const refCarousel = useRef<any>();
    const [loading, setLoading] = useState(true);
    const [pageMoviesPopular, setPageMoviesPopular] = useState(1);
    const [pageTopRatedMovies, setPageTopRatedMovies] = useState(1);
    const [pageUpcomingMovies, setPageUpcomingMovies] = useState(1);
    const [moviesUpcoming, setMoviesUpcoming] = useState({} as Movies);
    const [topRatedMovies, setTopRatedMovies] = useState({} as Movies);
    const [popularMovies, setPopularMovies] = useState({} as Movies);

    async function consultMoviesUpcoming() {

        setLoading(true);

        try {

            const { data } = await axios.get<Movies>("https://api.themoviedb.org/3/movie/upcoming", {
                params: {
                    page: pageUpcomingMovies
                }
            });
            
            setMoviesUpcoming(data);

        } catch(e: any) {
            console.error(e?.response ? e.response: e);
        } finally {
            setLoading(false);            
        }

    }
    
    async function consultMoviesPopular() {

        setLoading(true);

        try {

            const { data } = await axios.get<Movies>("https://api.themoviedb.org/3/movie/popular", {
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
            setLoading(false);            
        }

    }

    async function consultMoviesTopRated() {

        setLoading(true);

        try {

            const { data } = await axios.get<Movies>("https://api.themoviedb.org/3/movie/top_rated", {
                params: {
                    page: pageTopRatedMovies
                }
            });
            
            if(pageTopRatedMovies > 1) {
                setTopRatedMovies({
                    page: data.page,
                    results: [
                        ...popularMovies.results,
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
            setLoading(false);            
        }

    }

    useEffect(() => {
        consultMoviesPopular();
    }, [pageMoviesPopular]);

    useEffect(() => {     
        consultMoviesUpcoming();   
    }, [pageUpcomingMovies]);

    useEffect(() => {
        consultMoviesTopRated();
    }, [pageTopRatedMovies])

    if(loading) {
        return <AnimatedLoader
            visible
            overlayColor="#1c243bec'"
            source={require('../../assets/95494-double-loader.json')}
            animationStyle={{
                width: '70%',
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center'                
            }}
            speed={1}
        >
            <Text>Loading movies...</Text>
        </AnimatedLoader>
    }
    
    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator                
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ 
                    flex: 1, 
                    width: '100%' 
                }}
                keyboardShouldPersistTaps="always"        
            >
                <ContainerCarousel>                    
                    <Carousel 
                        ref={refCarousel}
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
                            numberResults={moviesUpcoming.results.length}
                        />}
                    />
                </ContainerCarousel>
                <ContainerCategoryMovie>
                    <TextCategoryMovie>
                        Popular
                    </TextCategoryMovie>
                </ContainerCategoryMovie>
                <ContainerListMovies>
                    <ListMovies 
                        data={popularMovies}
                        loading={loading}
                        page={pageMoviesPopular}                    
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
                        loading={loading}
                        page={pageTopRatedMovies}                    
                        setPage={setPageTopRatedMovies}                        
                    />
                </ContainerListMovies>
            </ScrollView>
        </Container> 
    )

}

export default Home;