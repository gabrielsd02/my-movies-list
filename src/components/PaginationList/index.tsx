import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
    PageText,
    PaginationBoxArrow,
    ContainerPagination
} from './styles';

interface PaginationListProps {
    page: number;
    totalPages: number;
    setPage(value: number): void;    
}

function PaginationList({
    page,
    setPage,
    totalPages
}: PaginationListProps) {

    return <ContainerPagination>
        <PaginationBoxArrow
            style={{
                opacity: page > 1 ? 1 : 0.5
            }}
            onPress={() => {
                if(page > 1 ) setPage(page -1);
            }}
        >
            <FontAwesome 
                name='arrow-left'
                size={24}			
                color={'white'}				
            />
        </PaginationBoxArrow>
        <PageText>
            {page} - {totalPages ?? 1}
        </PageText> 
        <PaginationBoxArrow
            style={{
                opacity: page === totalPages ? 0.5 : 1
            }}
            onPress={() => {
                if(page < totalPages) setPage(page + 1);
            }}
        >
            <FontAwesome 
                name='arrow-right'
                size={24}			
                color={'white'}				
            />
        </PaginationBoxArrow>
    </ContainerPagination>

}

export default PaginationList;