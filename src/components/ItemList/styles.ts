import styled from 'styled-components/native';
import { Image } from 'expo-image';

export const Container = styled.View`
    height: 280px;
    width: 160px;
    margin-left: 5px;
    margin-right: 5px;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 5px;
`;

export const ContainerImagePressable = styled.TouchableOpacity.attrs({
    activeOpacity: 0.4
})`
    height: 85%;
    width: 100%;
`;

export const ImagePosterMovie = styled(Image).attrs({
    contentFit: 'cover'
})`
    height: 100%;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

export const ContainerTitleMovie = styled.View`
    width: 100%;
    flex-grow: 1;
    background-color: #a81111;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
    padding-left: 5px;
    padding-right: 5px;
`;

export const TextTitle = styled.Text.attrs({
    numberOfLines: 2
})`
    color: white;
    text-align: center;
    font-weight: bold;    
`;

export const ContainerPosterVoid = styled.View`
    flex-grow: 1; 
    justify-content: center; 
    align-items: center; 
    background-color: gray; 
    border-top-right-radius: 5px; 
    border-top-left-radius: 5px;
`;

export const TextPosterVoid = styled.Text`
    color: white;
`;