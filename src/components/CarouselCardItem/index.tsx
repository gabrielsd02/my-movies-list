import { memo } from 'react';
import { Movies } from '../../interfaces/home';
import {
    TextTitle,
    CircleElement,
    TextPositionItem,
    ContainerCircles,
    ImageBannerMovie, 
    ContainerTitleMovie,
    ContainerItemPressable
} from './styles';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../routes/navigationTypes';

interface CarouselItem {
    item: Movies['results'][0];
    index: number;
    navigation: DrawerNavigationProp<RootDrawerParamList>;
    numberResults: number;
}

export function CarouselCardItem({
    item,
    index,
    navigation,
    numberResults
}: CarouselItem) {
    
    return <ContainerItemPressable 
        key={index}
        onPress={() => {
            navigation.navigate('MovieDetails', {
                id: item.id
            })
        }}
    >
        <ImageBannerMovie
            source={{ uri: `http://image.tmdb.org/t/p/w500/${item.backdrop_path}`}}
        />
        <ContainerTitleMovie>
            <TextTitle>
                {item.title}
            </TextTitle>
        </ContainerTitleMovie>
        <ContainerCircles>     

            {[...Array(numberResults)].map((element, indexElement) => {                      

                if((index <= 8 && indexElement > 8) || (indexElement <= 8 && index > 8)) return;                                          

                return <CircleElement 
                    key={indexElement}
                    style={{ opacity: indexElement === index ? 1 : 0.2 }}
                >
                    <TextPositionItem>
                        {indexElement === index ? index + 1 : ''}
                    </TextPositionItem>
                </CircleElement>

            })}   

        </ContainerCircles>
    </ContainerItemPressable>

}

export default memo(CarouselCardItem);