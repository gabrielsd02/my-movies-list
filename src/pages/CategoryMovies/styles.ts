import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    margin: 0px;
    position: relative;
    justify-content: center;
`;

export const ContainerPagination = styled.View`
    width: 95%;					
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: rgba(0, 0 , 0, 0.3);
    border-radius: 10px;
    flex-direction: row;
`;

export const PaginationBoxArrow = styled.TouchableOpacity.attrs({
    activeOpacity: 0.4
})`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 5px;
    background-color: #1b0096;
`;

export const PageText = styled.Text`
    color: white;
    font-size: 22px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const ContainerList = styled.View`
    width: 95%;		
    flex-grow: 1;			
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px 8px;
`;

export const InputContainer = styled.View`
    width: 100%; 
    align-items: center;
    margin-top: 10px; 
    justify-content: center; 
`;

export const TextListEmpty = styled.Text`
    font-size: 26px;
    color: gray;
    font-weight: bold;
    text-align: center;
`;

export const ContainerGenresMovie = styled.View`
    align-items: center;
    justify-content: flex-start;                            
    padding: 5px;
    flex-direction: row;
    overflow: hidden;        
    flex-wrap: wrap;
`;

export const BackgroundGenre = styled.TouchableOpacity.attrs({
    activeOpacity: 0.4
})`
    border-radius: 20px;
    margin: 5px;
    border-width: 1px;
    border-color: gray;
    padding: 5px 10px;
`;

export const TextGenre = styled.Text`
    color: white;
    font-size: 12px;
`;

export const Title = styled.Text`
    color: white;
    font-weight: bold;
    width: 95%;
    font-size: 22px;
    margin-left: 10px;
    text-align: left;
`;