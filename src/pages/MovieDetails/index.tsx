import React, { useEffect, useState } from 'react';
import { 
    Alert,  
    Share,
    ScrollView,  
    BackHandler 
} from 'react-native';
import { Image } from 'expo-image';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { FlashList } from '@shopify/flash-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { 
    Title,
    TextScore,
    TextGenre,
    Container,
    NameCompany,
    TextDateHour,
    TextOverview,
    ImageBackdrop,
    BoxImageMovie,
    ContainerMovie,
    MovieTopicText,
    ContainerIcons,
    ContainerTitle,
    BackgroundGenre,
    ContainerListCast,
    ContainerTextIcon,
    ContainerCompanies,
    PressableAroundIcon,
    MovieTopicContainer,
    ContainerInsideImage,
    ContainerGenresMovie,
    ContainerImageCompany,
    ContainerDateAndScoreMovie
} from './styles';
import { RootDrawerParamList } from '../../routes/navigationTypes';
import { MovieCastProps, Movies } from '../../interfaces/movies';
import axios from '../../../api';
import Loader from '../../components/Loader';
import ItemListCast from '../../components/ItemListCast';

type MovieInfoProps = Omit<Movies['results'][0], "genre_ids"> & {
    genres: {
        id: number;
        name: string;
    }[];
    production_companies: {
        id: number;
        logo_path?: string;
        name: string;
        origin_country: string;
    }[];
    runtime: number;
    status: string;
}

interface MovieDetailsProps {
    navigation: DrawerNavigationProp<RootDrawerParamList, 'MovieDetails'>;
    route: RouteProp<RootDrawerParamList, 'MovieDetails'>;
}

function MovieDetails({ route, navigation }: MovieDetailsProps) {
    
    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [movieInfo, setMovieInfo] = useState({} as MovieInfoProps);
    const [movieCast, setMovieCast] = useState<MovieCastProps[]>([]);    
    
    async function consultCast(id: number) {

        try {

            const { data } = await axios.get<{cast: MovieCastProps[]}>(`/movie/${id}/credits`);            
            setMovieCast(data.cast);

        } catch(e: any) {
            console.error(e);
            Alert.alert("Error", "Movie don't have cast");
        }     

    }
    
    async function consultMovie() {

        const id = route.params.id;
        
        if(!id) return Alert.alert("Error", "ID movie not found");
        setLoading(true);

        try {

            const { data } = await axios.get<MovieInfoProps>(`/movie/${id}`);
            await consultCast(id);

            const releaseData = new Date(data.release_date);            
            const releaseDateFormatted = (
                addZero(releaseData.getDay()) + "/" + 
                addZero(releaseData.getMonth() + 1) + "/" + 
                releaseData.getFullYear()
            );

            setMovieInfo({
                ...data,
                release_date: releaseDateFormatted
            });

        } catch(e: any) {
            console.error(e);
            Alert.alert("Error", "Movie not found");
        } finally {
            setLoading(false);
        }

    }

    function addZero(number: number) {
        if(number <= 9) return "0" + number;
        return number;
    }

    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    const onShare = async () => {
        
        try {

            await Share.share({
                title: 'This movie is awesome!',
                message: `Name: ${movieInfo.title} | Release Date and Running Time: ${movieInfo.release_date} - ${movieInfo.runtime}min | Image Location: http://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path ?? movieInfo.poster_path}`,
                url: `http://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path ?? movieInfo.poster_path}`
            });
            
        } catch (error: any) {
            console.error(error);
            Alert.alert(error.message);
        }
    }

    useEffect(() => {

        consultMovie();

        const backAction = () => {
                        
            if(route.params.lastRoute) {                                                
                navigation.navigate(route.params.lastRoute!);
            } else if(navigation.canGoBack()) {
                navigation.goBack();
            }           
            
            return true;

        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();

    }, [route]);
    
    return (
        <Container>
            {(!loading) ? (
                <ContainerMovie>
                    <BoxImageMovie>
                        <ImageBackdrop
                            source={{ uri: `http://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path ?? movieInfo.poster_path} `}}                            
                        >
                            <ContainerInsideImage>
                                <ContainerIcons>
                                    <PressableAroundIcon
                                        onPress={onShare}
                                    >
                                        <FontAwesome 
                                            color={'#f2f2f2'}
                                            size={26}
                                            name={'share-alt'}
                                        />
                                    </PressableAroundIcon>
                                    <PressableAroundIcon>
                                        <FontAwesome 
                                            color={'red'}
                                            size={26}
                                            name={'heart-o'}
                                        />
                                    </PressableAroundIcon>
                                </ContainerIcons>
                            </ContainerInsideImage>
                        </ImageBackdrop>
                    </BoxImageMovie>
                    <ScrollView
                        showsVerticalScrollIndicator                
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ 
                            flex: 1, 
                            width: '100%'
                        }}
                        keyboardShouldPersistTaps="always"  
                    >
                        <ContainerTitle>
                            <Title
                                style={{
                                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                    textShadowOffset: {
                                        width: 5, 
                                        height: 5
                                    },
                                    textShadowRadius: 10
                                }}
                            >
                                {movieInfo.title}
                            </Title>
                        </ContainerTitle>
                        <ContainerDateAndScoreMovie>
                            <ContainerTextIcon>
                                <FontAwesome 
                                    color={'white'}
                                    name='calendar'
                                    size={20}
                                />
                                <TextDateHour>
                                    {movieInfo.release_date}
                                </TextDateHour>
                                <FontAwesome 
                                    color={'white'}
                                    name='clock-o'
                                    size={20}
                                    style={{
                                        marginLeft: 5
                                    }}
                                />
                                <TextDateHour>
                                    {movieInfo.runtime}min
                                </TextDateHour>
                            </ContainerTextIcon>
                            {movieInfo.vote_average ? (
                                <ContainerTextIcon>
                                    <FontAwesome 
                                        color={'yellow'}
                                        name='star'
                                        size={24}
                                    />
                                    <TextScore>
                                        {movieInfo.vote_average.toFixed(1)}
                                    </TextScore>
                                </ContainerTextIcon>
                            ) : <></>}
                        </ContainerDateAndScoreMovie>
                        <ContainerGenresMovie>
                            {(movieInfo.genres && movieInfo.genres.map((genre, index) => (
                                <BackgroundGenre
                                    key={index}
                                    style={{ backgroundColor: generateColor() }}
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
                            )))}
                        </ContainerGenresMovie>
                        {(movieInfo.overview) && (
                            <MovieTopicContainer>
                                <MovieTopicText>
                                    Plot
                                </MovieTopicText>
                                <TextOverview>
                                    {movieInfo.overview ?? ''}
                                </TextOverview>
                            </MovieTopicContainer>
                        )}
                        {(movieCast && movieCast.length > 0) && (
                            <MovieTopicContainer>
                                <MovieTopicText>
                                    Cast
                                </MovieTopicText>
                                <ContainerListCast>
                                    <FlashList 
                                        data={movieCast}
                                        keyExtractor={(movie) => movie.id.toString()}
                                        estimatedItemSize={movieCast.length || undefined}
                                        renderItem={({ item, index }) => <ItemListCast 
                                            item={item}
                                            key={index}
                                        />}                                        
                                        contentContainerStyle={{ paddingVertical: 10 }}
                                        horizontal
                                    />
                                </ContainerListCast>
                            </MovieTopicContainer>
                        )}
                        <ContainerCompanies>                         
                            {
                                movieInfo.production_companies && 
                                movieInfo.production_companies
                                .map((pc, index) => {                                                                                    
                                    return (
                                        <ContainerImageCompany
                                            key={index}
                                            style={{
                                                width: pc.logo_path ? 50 : 'auto',
                                                height: pc.logo_path ? 50 : 'auto'
                                            }}
                                        >
                                            {pc.logo_path ? <Image                                         
                                                source={`http://image.tmdb.org/t/p/w200${pc.logo_path}`}                                        
                                                contentFit='contain'
                                                style={{
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            /> : <NameCompany>
                                                {pc.name ?? ''}
                                            </NameCompany>}
                                        </ContainerImageCompany>
                                    )
                                })
                            }
                        </ContainerCompanies>
                    </ScrollView>
                </ContainerMovie>
            ) : <Loader />}
        </Container>
    )

}

export default MovieDetails;