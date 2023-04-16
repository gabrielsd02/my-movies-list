import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    margin: 0px;
    position: relative;
    justify-content: center;
`;

export const ContainerList = styled.View`
    width: 95%;		
    flex-grow: 1;			
    margin-top: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px 8px;
`;

export const Title = styled.Text`
    margin-top: 20px;
    font-size: 30px;
    text-decoration-line: underline;
    color: white;
    text-align: left;
    font-weight: bold;
`;

export const TextListEmpty = styled.Text`
    font-size: 26px;
    color: gray;
    font-weight: bold;
    text-align: center;
`;