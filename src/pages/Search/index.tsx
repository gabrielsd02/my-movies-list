import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, RefreshControl } from 'react-native'
import { FlashList } from '@shopify/flash-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  Container
} from './styles';
import { Movies } from '../../interfaces/home';
import axios from '../../../api';
import ItemList from '../../components/ItemList';

function Search() {

	const [word, setWord] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [moviesResults, setMoviesResults] = useState({} as Movies);
	
	async function consult() {

		setLoading(true);
		
        try {
			
            const { data } = await axios.get<Movies>("/search/movie", {
                params: {
					query: word,
					language: 'en-US'
                }
            });
			
			setMoviesResults(data);

        } catch(e: any) {
            console.error(e?.response ? e.response: e);
        } finally {
            setLoading(false);            
        }

	}

	const ListEmpty = () => (
		<View style={{ marginTop: 20 }}>
			<Text
				style={{
					fontSize: 26,
					color: 'gray',
					fontWeight: 'bold',
					textAlign: 'center'
				}}
			>
				{(word && word.length > 0) ? 'Not found records :(' : 'The list is empty'}
			</Text>
		</View>
	)
	
	return (
		<Container>
			<View style={{ width: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', marginVertical: 30, paddingHorizontal: 20 }}>
				<View style={{ position: 'relative', width: '100%', flexDirection: 'row' }}>					
					<Text
						style={{
							position: 'absolute',
							left: (isInputFocused || word) ? 0 : 5,
							color: 'white',
							bottom: (isInputFocused || word) ? 40 : 8,
							fontSize:  (isInputFocused || word) ? 14 : 24,
							opacity: 0.5
						}}
					>
						Search by movie title
					</Text>
					
					<TextInput 
						value={word || ''}
						blurOnSubmit
						onChangeText={(text) => {
							if(text === '') {
								setWord(null);
								return setMoviesResults({} as Movies);
							}
							setWord(text);
						}}					
						onSubmitEditing={consult}
						style={{
							height: 50,
							fontSize: 24,
							paddingTop: 10,
							paddingLeft: 10,
							width: '90%',					
							color: 'white',
							borderBottomColor: 'white',
							borderBottomWidth: 2,
							fontFamily: 'Roboto'
						}}												
						scrollEnabled
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => setIsInputFocused(false)}
					/>		
					<TouchableOpacity
						style={{
							height: 50,
							paddingBottom: 5,
							flex: 1,							
							alignItems: 'center',
							justifyContent: 'flex-end'
						}}
						onPress={consult}
						activeOpacity={0.5}
					>
						<FontAwesome 
							color={'white'}
							size={26}
							name={'search'}
						/>
					</TouchableOpacity>			
				</View>
			</View>	
			<View 
				style={{
					height: '85%',
					maxHeight: 530,
					width: '95%',					
					paddingBottom: 10,
					borderRadius: 5,
					padding: 10,
					backgroundColor: (!moviesResults.results || moviesResults.results.length === 0 ) ? 'transparent' : 'rgba(0, 0 , 0, 0.3)',
					// alignItems: (!moviesResults.results || moviesResults.results.length === 0 ) ? 'center' : 'flex-start',
					// justifyContent: (!moviesResults.results || moviesResults.results.length === 0 ) ? 'center' : 'flex-start'
				}}
			>
				<FlashList 
					data={moviesResults.results}
					estimatedItemSize={(moviesResults.results && moviesResults?.results?.length) ? moviesResults?.results?.length : undefined}
					showsVerticalScrollIndicator
					renderItem={({ item, index }) => <ItemList 
						item={item}
						styleContainer={{
							width: 150,
							height: 250,
							margin: 0,
							marginBottom: 20,
							padding: 0,
							alignItems: 'center',
							justifyContent: 'center'
						}}
					/>}  
					refreshing={loading}
					refreshControl={
						<RefreshControl 
							refreshing={loading || false}
							tintColor={'#182C6C'}
							colors={['#182C6C']}
							progressBackgroundColor={'white'}
							onRefresh={() => {
								setPage(page);
							}}	
						/>
					}
					ListEmptyComponent={ListEmpty}
					numColumns={2}     
				/>	
			</View>	
		</Container>
	)

}

export default Search;