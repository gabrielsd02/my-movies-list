import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { Movies } from '../../interfaces/movies';
import { RootDrawerParamList } from '../../routes/navigationTypes';
import ItemList from '../ItemList';

interface ListMoviesProps {
    data: Movies;
    loading: boolean;
    page?: number;
    numberOfColumns?: number;
    horizontal?: boolean;
    lastRoute?: "Home" | "Search" | "CategoryMovies" | "Favorites"; 
    navigation?: DrawerNavigationProp<RootDrawerParamList>;
    styleItem?: object;
    setPage?: (value: number) => void;
    functionRefresh?: () => void;
    componentListEmpty?: () => JSX.Element;
}

export default function ListMovies({
    page,
    data,
    loading,
    lastRoute,
    styleItem,
    navigation,
    horizontal=true,
    numberOfColumns,
    setPage,
    functionRefresh,
    componentListEmpty
}: ListMoviesProps) {

    return <FlashList 
        data={data.results}
        keyExtractor={(movie) => movie.id.toString()}
        estimatedItemSize={data?.results?.length || 20}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
        refreshing={loading}                        
        horizontal={horizontal}
        numColumns={numberOfColumns}
        ListEmptyComponent={componentListEmpty}                        
        refreshControl={(
            <RefreshControl 
                refreshing={loading || false}
                tintColor={'#182C6C'}
                colors={['#182C6C']}
                progressBackgroundColor={'white'}
                onRefresh={functionRefresh ?? undefined}
            />
        )}        
        renderItem={({ item, index }) => <ItemList 
            item={item}
            lastRoute={lastRoute}
            styleContainer={styleItem}
            key={index}
            navigation={navigation}
        />}
        onEndReached={() => {
            if(loading || (page && data.total_pages <= page)) return;
            if(setPage) setPage(page! + 1);
        }}
    />

}