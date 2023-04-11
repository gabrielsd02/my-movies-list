import { memo } from 'react';
import { FlashList } from '@shopify/flash-list';

import { Movies } from '../../interfaces/home';
import ItemList from '../ItemList';

interface ListMoviesProps {
    data: Movies;
    loading: boolean;
    page: number;
    setPage(value: number): void;
}

export default function ListMovies({
    data,
    loading,
    page,
    setPage
}: ListMoviesProps) {

    return <FlashList 
        data={data.results}
        estimatedItemSize={data?.results?.length || 0}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
        renderItem={({ item, index }) => <ItemList 
            item={item}
            key={index}
        />}
        onEndReached={() => {
            if(loading || data.total_pages <= page) return;
            setPage(page + 1);
        }}                                        
        horizontal
    />

}