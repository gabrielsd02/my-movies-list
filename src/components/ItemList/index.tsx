import { Movies } from "../../interfaces/home";
import {
    Container,
    TextTitle,
    ImagePosterMovie,
    ContainerTitleMovie,
    ContainerImagePressable
} from './styles';

interface ItemListProps {
    item: Movies['results'][0];
    styleContainer?: object;
}

export default function ItemList({
    item,
    styleContainer
}: ItemListProps) {

    return <Container style={styleContainer || {}}>
        <ContainerImagePressable>
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