import { DrawerNavigationProp } from "@react-navigation/drawer";

import { Movies } from "../../interfaces/movies";
import { RootDrawerParamList } from "../../routes/navigationTypes";
import {
    Container,
    TextTitle,
    ImagePosterMovie,
    ContainerTitleMovie,
    ContainerImagePressable,
    ContainerPosterVoid,
    TextPosterVoid
} from './styles';

interface ItemListProps {
    lastRoute?: "Home" | "Search" | "CategoryMovies" | "Favorites"; 
    item: Movies['results'][0];
    styleContainer?: object;
    navigation?: DrawerNavigationProp<RootDrawerParamList>;
}

export default function ItemList({
    lastRoute,
    item,
    styleContainer,
    navigation
}: ItemListProps) {

    const handleImagePress = () => {        
        if(navigation) {
            navigation.navigate('MovieDetails', {
                id: item.id,
                lastRoute
            })
        }
    }

    return <Container style={styleContainer || {}}>
        <ContainerImagePressable
            onPress={handleImagePress}
        >
            {(item.poster_path) ? (
                <ImagePosterMovie 
                    source={{ uri: `http://image.tmdb.org/t/p/w200/${item.poster_path}` }}                
                />
            ) : <ContainerPosterVoid>
                <TextPosterVoid>
                    No Photos
                </TextPosterVoid>
            </ContainerPosterVoid>}
        </ContainerImagePressable>
        <ContainerTitleMovie>
            <TextTitle>
                {item.title}
            </TextTitle>
        </ContainerTitleMovie>
    </Container>

}