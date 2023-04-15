import styled from 'styled-components/native';

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