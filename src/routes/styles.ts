import { StatusBar } from "react-native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from "styled-components/native";

const heightBar = StatusBar.currentHeight ? StatusBar.currentHeight : getStatusBarHeight();

export const HeaderDrawerItems = styled.View`
    flex: 1;
    margin-top: ${heightBar}px;
`;

export const ContainerTitleDrawer = styled.View`    
    padding-top: 25px;
    padding-bottom: 25px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;                    
    align-items: center;
    overflow: hidden;
    justify-content: center;
    margin-bottom: 10px;
`;

export const TitleDrawer = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: white;
    font-style: italic;
    text-align: center;
    text-decoration-line: underline;
    font-family: Roboto;
`;

export const ContainerLogout = styled.View`
    padding: 20px;
    border-top-width: 1px;
    border-top-color: #ccc;
`;

export const ContainerIconTextLogout = styled.View`
    flex-direction: row; 
    align-items: center;
`;

export const TextLogout = styled.Text`
    margin-left: 15px;
    margin-bottom: 3px;
    font-size: 20px;
    font-weight: bold;
    color: white;   
`;