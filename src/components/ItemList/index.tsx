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
}

export default function ItemList({
    item
}: ItemListProps) {

    return <Container>
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