import React from "react";
import AnimatedLoader from 'react-native-animated-loader';

import { TextLoading } from './styles'; 

function Loader({
    message='Loading...'
}) {

    return <AnimatedLoader
        visible
        overlayColor="#1c243bec'"
        source={require('../../assets/95494-double-loader.json')}
        animationStyle={{
            width: '70%',
            height: '70%',
            alignItems: 'center',
            justifyContent: 'center'                
        }}
        speed={1}
    >
        <TextLoading>
            {message}
        </TextLoading>
    </AnimatedLoader>

}

export default Loader;