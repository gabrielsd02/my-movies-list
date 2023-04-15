import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
    width: ${width}px;
    height: ${height}px;
    align-items: center;
    margin: 0px;
    position: relative;
    justify-content: center;
    background-color: #1c243bec;
`;

export const ImageBack = styled.ImageBackground.attrs({
    resizeMode: 'cover'
})`
    height: 100%;
    width: 100%;
    align-items: center;                
    justify-content: center;
`;

export const ContainerKeyboard = styled.KeyboardAvoidingView`
    position: absolute; 
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px; 
`;

export const ContainerTexts = styled.View`
    width: 100%;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
`;

export const TitleEmphasis = styled.Text`
    color: white;
    font-size: 40px;
    text-align: center;
    font-weight: bold;
`;

export const SubTitle = styled.Text`
    color: white;
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
`;

export const ContainerInputs = styled.View`
    padding: 20px;
    width: 100%;
    height: 200px;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
`;

export const ContainerAroundElements = styled.View`
    flex-grow: 1;
    width: 100%;
    padding: 20px;
    align-items: center;
    justify-content: center;    
`;

export const ContainerPassword = styled.View`
    flex-direction: row; 
    align-items: center; 
    justify-content: center; 
    border-width: 1px;
    border-radius: 5px;
    border-color: white; 
`;

export const ContainerButton = styled.View`
    width: 100%;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 20px;
`;

export const ButtonLogin = styled.TouchableOpacity.attrs({
    activeOpacity: 0.4
})`
    padding: 10px;
    border-radius: 5px;                                
    background-color: green;
`;

export const TextButton = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 3px;
`;