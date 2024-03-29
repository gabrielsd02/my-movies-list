import React, { useState } from 'react'
import { 
    Platform,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

import {
    SubTitle,
    Container,
    ImageBack,
    TextButton,
    ButtonLogin,
    TitleEmphasis,
    ContainerTexts,
    ContainerButton,
    ContainerInputs,
    ContainerKeyboard,
    ContainerPassword,
    ContainerAroundElements
} from './styles';
import { setSignIn } from '../../store';

function SignIn() {

    const dispatch = useDispatch();

    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string | null>(null);
    const [showPass, setShowPass] = useState(false);
    
    async function signIn() {   
        
        setLoading(true);

        try {

            const dataCache = {
                authenticated: true,
                user: user!
            };

            dispatch(
                setSignIn(dataCache)
            );

            await AsyncStorage.setItem("@my-movies-list:user", JSON.stringify(dataCache));

        } catch(e: any) {
            console.error(e);
            Alert.alert("Error", e.message ? e.message : "There was a error when performing the login. Please verify your connection with the network.");
        } finally {
            setLoading(false);
        }         

    }

    const handleSignIn = () => {

        if(!user) {
            return Toast.show({
                type: 'error',
                autoHide: true,                
                text1: 'The username field is mandatory!'
            });
        }

        if(!password) {
            return Toast.show({
                type: 'error',
                autoHide: true,
                text1: 'The password field is mandatory!'
            });
        }

        if(user !== 'Gabriel' || password !== '123') {
            return Toast.show({
                type: 'error',
                autoHide: true,
                text1: 'The username or password is wrong'
            });
        }

        signIn(); 

    }

    return (
        <Container>            
            <ImageBack
                source={require('../../assets/images/movie-background.jpg')}
            >
                <ContainerKeyboard
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ContainerAroundElements>
                        <ContainerTexts>
                            <TitleEmphasis
                                style={{
                                    textShadowColor: '#FFF',
                                    textShadowOffset: {
                                        width: 1, 
                                        height: 1
                                    },
                                    textShadowRadius: 10
                                }}
                            >
                                Welcome to
                            </TitleEmphasis>
                            <TitleEmphasis
                                style={{
                                    fontStyle: 'italic',
                                    textShadowColor: '#FFF',
                                    textShadowOffset: {
                                        width: 1, 
                                        height: 1
                                    },
                                    textShadowRadius: 10
                                }}
                            >
                                MyMoviesList!
                            </TitleEmphasis>
                            <SubTitle>
                                Sign In to see a cinematic universe
                            </SubTitle>
                        </ContainerTexts>
                        <ContainerInputs>
                            <TextInput 
                                value={user ?? ''}
                                onChangeText={(text: string)=> setUser(text)}
                                placeholder='Username'
                                placeholderTextColor={'gray'}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    paddingHorizontal: 15,
                                    height: 65,
                                    borderColor: 'white',
                                    color: 'white',
                                    width: '100%'
                                }}
                                onSubmitEditing={handleSignIn}
                            />
                            <ContainerPassword>
                                <TextInput 
                                    value={password ?? ''}
                                    onChangeText={(text: string)=> setPassword(text)}
                                    placeholder='Password'
                                    placeholderTextColor={'gray'}
                                    secureTextEntry={!showPass}
                                    style={{                                        
                                        paddingHorizontal: 15,
                                        height: 65,
                                        color: 'white',
                                        flex: 1
                                    }}                                    
                                    onSubmitEditing={handleSignIn}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.4}
                                    onPress={() => setShowPass(!showPass)}
                                    style={{ marginRight: 15 }}
                                >
                                    <FontAwesome 
                                        name={showPass ? 'eye' : 'eye-slash'}
                                        size={24}
                                        color={'white'}                                    
                                    />
                                </TouchableOpacity>
                            </ContainerPassword>
                        </ContainerInputs>
                        <ContainerButton>
                            <ButtonLogin
                                onPress={handleSignIn}
                            >
                                <TextButton>
                                    LOGIN
                                </TextButton>
                                {(loading) && <ActivityIndicator 
                                    color={'white'}
                                    animating
                                    size={24}
                                    style={{
                                        marginLeft: 10
                                    }}
                                />}
                            </ButtonLogin>
                        </ContainerButton>
                    </ContainerAroundElements>
                </ContainerKeyboard>
                <Toast 
                    autoHide    
                    bottomOffset={70}                
                    visibilityTime={5000}
                    position='bottom'
                />
            </ImageBack>
        </Container>
    )

}

export default SignIn;