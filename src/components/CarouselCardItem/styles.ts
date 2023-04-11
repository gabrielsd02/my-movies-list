import styled from "styled-components/native";
import { Image } from 'expo-image';

export const ContainerItemPressable = styled.TouchableOpacity.attrs({
    activeOpacity: 0.4
})`
    height: 100%; 
    width: 100%; 
    position: relative; 
    flex-direction: row; 
    align-items: center; 
    justify-content: center; 
    overflow: hidden;
`;

export const ImageBannerMovie = styled(Image).attrs({
    contentFit: 'contain'
})`
    width: 100%;
    height: 100%;
`;

export const ContainerTitleMovie = styled.View`
    position: absolute;
    bottom: 30px;
    left: 5px;                    
    max-width: 330px;  
`;

export const TextTitle = styled.Text.attrs({
    numberOfLines: 1
})`
    text-align: left;
    padding: 5px;
    background-color: #cf5935e1;
    border-width: 1px;
    border-color: black;
    border-style: solid;
    border-radius: 5px;      
    font-size: 16px;
    font-weight: bold;
`;

export const TextPositionItem = styled.Text`
    font-size: 10px;
`;

export const CircleElement = styled.View`
    height: 20px; 
    width: 20px; 
    align-items: center; 
    justify-content: center;
    background-color: gray; 
    border-radius: 50px;
`;

export const ContainerCircles = styled.View`
    position: absolute;
    bottom: 0px;
    width: 100%;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-evenly;
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
`;