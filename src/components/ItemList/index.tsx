import { DrawerNavigationProp } from "@react-navigation/drawer";

import { Movies } from "../../interfaces/movies";
import { RootDrawerParamList } from "../../routes/navigationTypes";
import {
    Container,
    TextTitle,
    ImagePosterMovie,
    ContainerTitleMovie,
    ContainerImagePressable
} from './styles';

interface ItemListProps {
    lastRoute?: "Home" | "Search"; 
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
            <ImagePosterMovie 
                source={{ uri: `http://image.tmdb.org/t/p/w200/${item.poster_path}` }}                
            />
        </ContainerImagePressable>
        <ContainerTitleMovie>
            <TextTitle>
                {item.title}
            </TextTitle>
        </ContainerTitleMovie>
    </Container>

}