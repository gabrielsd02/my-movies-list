import { memo } from 'react';
import { FlashList } from '@shopify/flash-list';

import { Movies } from '../../interfaces/home';
import ItemList from '../ItemList';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../routes/navigationTypes';

interface ListMoviesProps {
    data: Movies;
    loading: boolean;
    page: number;
    navigation?: DrawerNavigationProp<RootDrawerParamList>;
    setPage(value: number): void;
}

export default function ListMovies({
    data,
    loading,
    page,
    navigation,
    setPage
}: ListMoviesProps) {

    return <FlashList 
        data={data.results}
        keyExtractor={(movie) => movie.id.toString()}
        estimatedItemSize={data?.results?.length || 0}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
        renderItem={({ item, index }) => <ItemList 
            item={item}
            key={index}
            navigation={navigation}
        />}
        onEndReached={() => {
            if(loading || data.total_pages <= page) return;
            setPage(page + 1);
        }}                                        
        horizontal
    />

}