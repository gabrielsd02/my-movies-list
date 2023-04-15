import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    margin: 0px;
    position: relative;
    justify-content: center;
`;

export const ContainerMovie = styled.View`
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
    width: 100%;
`;

export const BoxImageMovie = styled.View`
    height: 250px;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-bottom-color: white;
    border-bottom-width: 1px;
`;

export const ImageBackdrop = styled.ImageBackground.attrs({
    resizeMode: 'cover'
})`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const ContainerInsideImage = styled.View`
    align-items: flex-end;
    flex-grow: 1;
    width: 100%;
    padding: 15px;
    justify-content: flex-end;
`;

export const ContainerIcons = styled.View`
    align-items: center;
    justify-content: center;
    gap: 15px;
    border-width: 1px;
    border-color: white;
    padding: 7px 10px;
    background-color: rgba(0,0,0,0.3);
    border-radius: 5px;
    flex-direction: row;
`;

export const PressableAroundIcon = styled.TouchableOpacity.attrs({
    activeOpacity: 0.4
})``;

export const ContainerTitle = styled.View`
    padding: 5px;
    min-height: 70px;
    align-items: center;
    justify-content: center;
    background-color: #cf5935e1;
`;

export const Title = styled.Text`
    font-size: 30px;
    color: white;
    font-style: italic;
    text-align: center;
    font-weight: bold;
`;

export const ContainerDateAndScoreMovie = styled.View`
    width: 100%;
    margin-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

export const ContainerTextIcon = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5px;
`;

export const TextDateHour = styled.Text`
    color: white;
`;

export const TextScore = styled.Text`
    color: yellow; 
    font-size: 24px; 
    margin-bottom: 2px;
    font-weight: bold; 
`;

export const ContainerGenresMovie = styled.View`
    align-items: center;
    justify-content: flex-start;                            
    padding: 5px;
    flex-direction: row;
    overflow: hidden;        
    flex-wrap: wrap;
`;

export const BackgroundGenre = styled.View`
    border-radius: 20px;
    margin: 5px;
    border-width: 1px;
    border-color: gray;
    padding: 5px 10px;
`;

export const TextGenre = styled.Text`
    color: white;
`;

export const MovieTopicContainer = styled.View`     
    padding: 0px 15px;
    margin: 5px 0px;
    width: 100%;               
    align-items: flex-start;
    justify-content: center;
`;

export const MovieTopicText = styled.Text`
    font-weight: bold;
    font-size: 24px;
    color: white;
    text-align: left;
    text-decoration-line: underline;
`;

export const TextOverview = styled.Text`
    color: white;
    text-align: justify;
    margin-top: 5px;
    font-size: 16px;
    line-height: 18px;
    font-family: sans-serif;
`;

export const ContainerListCast = styled.View`
    height: 250px;
    margin-top: 5px;
    padding: 0px 5px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
`;

export const ContainerCompanies = styled.View`
    align-items: center;
    justify-content: center;                            
    padding: 5px;
    margin-top: 10px;
    flex-direction: row;
    overflow: hidden;  
    flex-grow: 1;
    flex-wrap: wrap;                             
    background-color: rgba(0,0,0,0.2); 
`;

export const ContainerImageCompany = styled.View`
    align-items: center;
    justify-content: center;
    margin: 5px 10px;
`;

export const NameCompany = styled.Text`
    color: white; 
    font-size: 10px; 
    text-align: center; 
    align-self: center; 
    margin-bottom: 2px;
`;