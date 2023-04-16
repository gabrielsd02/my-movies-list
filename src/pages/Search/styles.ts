import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const heightBar = StatusBar.currentHeight ? StatusBar.currentHeight : getStatusBarHeight();

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
    max-width: 500px;
    flex-grow: 1;			
    margin: 10px 0px;
    border-radius: 5px;
    padding: 10px 8px;
`;

export const LabelInput = styled.Text`
    position: absolute;
    color: white;
    opacity: 0.5;
`;

export const InputContainer = styled.View`
    width: 100%; 
    align-items: center; 
    justify-content: center; 
    margin-top: ${heightBar}px;
    margin-bottom: 10px;     
    padding-left: 20px;
    padding-right: 20px;
`;

export const SubInputContainer = styled.View`
    position: relative; 
    width: 100%; 
    flex-direction: row;
`;

export const TextListEmpty = styled.Text`
    font-size: 26px;
    color: gray;
    font-weight: bold;
    text-align: center;
`;