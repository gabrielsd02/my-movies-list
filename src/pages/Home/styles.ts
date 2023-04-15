import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    margin: 0px;
    position: relative;
    justify-content: center;
`;

export const ContainerCarousel = styled.View`
    height: 250px 
    background-color: rgba(0, 0 , 0, 0.3); 
    align-items: center; 
    margin-top: 10px;
    justify-content: center;
`;

export const ContainerCategoryMovie = styled.View`
    width: 100%;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 20px;
    margin-bottom: 0px;
    align-items: flex-start;
    justify-content: center;
`;

export const TextCategoryMovie = styled.Text`
    font-weight: bold;
    font-size: 28px;
    color: white;
    text-align: left;
`;

export const ContainerListMovies = styled.View`
    height: 300px;
    width: 100%;
    background-color: rgba(0, 0 , 0, 0.3);
    margin-top: 10px;
    align-items: center;
    justify-content: center;
`;