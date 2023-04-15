import { memo } from 'react';
import {
    TextTitle,
    Container,
    TextPhotoVoid,
    TextCharacter,
    ImagePosterMovie,
    ContainerPhotoVoid,
    ContainerTitleMovie,
    ContainerImagePressable
} from './styles';
import { MovieCastProps } from '../../interfaces/movies';

interface ItemListCastProps {
    item: MovieCastProps
}

function ItemListCast({
    item
}: ItemListCastProps) {
    
    return (
        <Container>
            <ContainerImagePressable>
                {(item.profile_path) ? <ImagePosterMovie 
                    source={{ uri: `http://image.tmdb.org/t/p/w200/${item.profile_path}` }}                
                /> : <ContainerPhotoVoid>
                    <TextPhotoVoid>
                        No Photos
                    </TextPhotoVoid>
                </ContainerPhotoVoid>}
            </ContainerImagePressable>
            <ContainerTitleMovie>
                <TextTitle>
                    {item.name}
                </TextTitle>
                {(item.character) && <TextCharacter>
                    {item.character}
                </TextCharacter>}
            </ContainerTitleMovie>
        </Container>
    )

}

export default memo(ItemListCast);