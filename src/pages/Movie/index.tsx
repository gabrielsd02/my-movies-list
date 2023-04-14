import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Alert, 
    ImageBackground, 
    ScrollView, 
    TouchableOpacity, 
    BackHandler 
} from 'react-native';
import { Image } from 'expo-image';
import { RouteProp } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { 
    Container 
} from './styles';
import { 
    Container as ContainerItem,
    ContainerImagePressable,
    ContainerTitleMovie,
    ImagePosterMovie,
    TextTitle
} from '../../components/ItemList/styles'
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../routes/navigationTypes';
import { Movies } from '../../interfaces/home';
import axios from '../../../api';
import Loader from '../../components/Loader';

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

interface MovieCastProps {
    adult: boolean;
    gender: number | null;
    id: number;
    character: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
}

function Movie({ route, navigation }: MovieDetailsProps) {
    
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {

        consultMovie();

        const backAction = () => {
                        
            if(route.params.lastRoute) {                                                
                navigation.navigate(route.params.lastRoute!);
            } else {
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
    
    const ItemList = ({ item }: { item: MovieCastProps }) => ( 
        <ContainerItem style={{height: 230, width: 160}}>
            <ContainerImagePressable>
                {(item.profile_path) ? <ImagePosterMovie 
                    source={{ uri: `http://image.tmdb.org/t/p/w200/${item.profile_path}` }}                
                /> : <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'gray', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                    <Text style={{color: 'white'}}>No Photos</Text>
                </View>}
            </ContainerImagePressable>
            <ContainerTitleMovie>
                <TextTitle>
                    {item.name}
                </TextTitle>
                {(item.character) && <Text
                    style={{
                        color: '#999999',
                        fontSize: 10                 
                    }}
                    numberOfLines={1}
                >
                    {item.character}
                </Text>}
            </ContainerTitleMovie>
        </ContainerItem>                                
    )
    
    return (
        <Container>
            {(!loading) ? <View
                style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexGrow: 1,
                    width: '100%'
                }}
            >
                <View
                    style={{
                        height: 250,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1
                    }}
                >
                    <ImageBackground
                        source={{ uri: `http://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path ?? movieInfo.poster_path} `}}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'flex-end',
                                flexGrow: 1,
                                width: '100%',
                                padding: 15,
                                justifyContent: 'flex-end'
                            }}
                        >
                            <View 
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 15,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    borderRadius: 5,
                                    flexDirection: 'row'
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                >
                                    <FontAwesome 
                                        color={'#f2f2f2'}
                                        size={32}
                                        name={'share-alt'}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                >
                                    <FontAwesome 
                                        color={'red'}
                                        size={32}
                                        name={'heart-o'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator                
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ 
                        flex: 1, 
                        width: '100%'
                    }}
                    keyboardShouldPersistTaps="always"  
                >
                    <View
                        style={{
                            padding: 5,
                            minHeight: 70,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#cf5935e1'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                color: 'white',
                                fontStyle: 'italic',
                                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                textShadowOffset: {
                                    width: 5, 
                                    height: 5
                                },
                                textShadowRadius: 10,
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                        >
                            {movieInfo.title}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginVertical: 10,
                            width: '100%',
                            paddingHorizontal: 15,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                gap: 5
                            }}
                        >
                            <FontAwesome 
                                color={'white'}
                                name='calendar'
                                size={20}
                            />
                            <Text style={{color: 'white'}}>
                                {movieInfo.release_date}
                            </Text>
                            <FontAwesome 
                                color={'white'}
                                name='clock-o'
                                size={20}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                            <Text style={{color: 'white'}}>
                                {movieInfo.runtime}min
                            </Text>
                        </View>
                        {movieInfo.vote_average ? <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                gap: 5
                            }}
                        >
                            <FontAwesome 
                                color={'yellow'}
                                name='star'
                                size={24}
                            />
                            <Text 
                                style={{ color: 'white', fontSize: 24 }}
                            >
                                {movieInfo.vote_average.toFixed(1)}
                            </Text>
                        </View> : <></>}
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'flex-start',                            
                            padding: 5,
                            flexDirection: 'row',
                            overflow: 'hidden',        
                            flexWrap: 'wrap'
                        }}
                    >
                        {(movieInfo.genres && movieInfo.genres.map((genre, index) => (
                            <View
                                key={index}
                                style={{
                                    borderRadius: 20,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    backgroundColor: generateColor(),
                                    margin: 5,
                                    borderWidth: 1,
                                    borderColor: 'gray'
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                        textShadowOffset: {
                                            width: 1, 
                                            height: 1
                                        },
                                        textShadowRadius: 10,
                                    }}
                                >
                                    {genre.name}
                                </Text>
                            </View>
                        )))}
                    </View>
                    {(movieInfo.overview) && <View
                        style={{
                            paddingHorizontal: 15,                     
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 24,
                                color: 'white',
                                textAlign: 'left',
                                textDecorationLine: 'underline'
                            }}
                        >
                            Plot
                        </Text>
                        <View
                            style={{
                                marginVertical: 5,
                                borderRadius: 5
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'justify',
                                    lineHeight: 18,
                                    fontFamily: 'sans-serif'
                                }}
                            >
                                {movieInfo.overview}
                            </Text>
                        </View>
                    </View>}
                    {(movieCast && movieCast.length > 0) && <View
                        style={{
                            marginBottom: 10,
                            width: '100%',
                            paddingHorizontal: 15,
                            alignItems: 'flex-start',
                            justifyContent: 'center'                            
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 24,
                                color: 'white',
                                textAlign: 'left',
                                textDecorationLine: 'underline'
                            }}
                        >
                            Cast
                        </Text>
                        <View
                            style={{
                                height: 250,
                                marginTop: 5,
                                paddingHorizontal: 5,
                                width: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <FlashList 
                                data={movieCast}
                                keyExtractor={(movie) => movie.id.toString()}
                                estimatedItemSize={movieCast.length || undefined}
                                renderItem={({ item, index }) => <ItemList 
                                    item={item}
                                    key={index}
                                />}                                        
                                contentContainerStyle={{ paddingVertical: 10 }}
                                horizontal
                            />
                        </View>
                    </View>}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',                            
                            padding: 5,
                            flexDirection: 'row',
                            overflow: 'hidden',  
                            flexGrow: 1,
                            flexWrap: 'wrap',                             
                            backgroundColor: 'rgba(0,0,0,0.2)'                              
                        }}                        
                    >                         
                        {movieInfo.production_companies && movieInfo.production_companies.map((pc, index) => {                                                                                    
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: pc.logo_path ? 50 : 'auto',
                                        height: pc.logo_path ? 50 : 'auto',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 10
                                    }}
                                >
                                    {pc.logo_path ? <Image                                         
                                        source={`http://image.tmdb.org/t/p/w200${pc.logo_path}`}                                        
                                        contentFit='contain'
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    /> : <Text
                                        style={{ color: 'white', fontSize: 10, textAlign: 'center', alignSelf: 'center', marginBottom: 2 }}
                                    >
                                        {pc.name ?? ''}
                                    </Text>}
                                </View>
                            )
                        })}
                    </View>

                </ScrollView>
            </View> : <Loader />}
        </Container>
    )

}

export default Movie;