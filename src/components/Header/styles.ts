import { StatusBar } from "react-native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from "styled-components/native";

const heightBar = StatusBar.currentHeight ? StatusBar.currentHeight : getStatusBarHeight();

export const Topbar = styled.View`
    flex-direction: row;
    width: 100%;
    height: 70px;
    margin-top: ${heightBar}px;
    background-color: #0b1b49eb;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-width: 1px;
    border-bottom-color: white;
    border-style: solid;
    justify-content: space-between;
`;

export const ContainerIcons = styled.View`
    flex-direction: row;
    gap: 30px;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const IconPressableContainer = styled.TouchableOpacity.attrs({
    activeOpacity: 0.4
})` 
    height: 100%; 
    margin: 0px; 
    align-items: center; 
    justify-content: center;
`;

export const TextNameApp = styled.Text`
    color: white; 
    font-size: 24px; 
    font-style: italic; 
    font-weight: bold; 
    margin-left: 10px; 
    margin-bottom: 5px;
    font-family: Roboto; 
`;

export const ContainerNameApp = styled.View`
    height: 100%; 
    margin: 0px; 
    align-items: center; 
    justify-content: center;
    margin-bottom: 2px; 
    flex-direction: row;
`;