import React, { useEffect, useState } from 'react'
import { 
	View, 
	TextInput, 
	TouchableOpacity,
	ScrollView,
	Alert
} from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
	PageText,
	Container,
	LabelInput,
	TextListEmpty,
	ContainerList,
	InputContainer,
	SubInputContainer,
	PaginationBoxArrow,
	ContainerPagination
} from './styles';
import { RootDrawerParamList } from '../../routes/navigationTypes';
import { Movies } from '../../interfaces/movies';
import ListMovies from '../../components/ListMovies';
import axios from '../../../api';
import PaginationList from '../../components/PaginationList';

interface SearchProps {
    navigation: DrawerNavigationProp<RootDrawerParamList, 'Search'>;
    route: RouteProp<RootDrawerParamList, 'Search'>;
}

function Search({ navigation }: SearchProps) {

	const [word, setWord] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [moviesResults, setMoviesResults] = useState({} as Movies);
	
	async function consult() {

		setLoading(true);
		
        try {
			
            const { data } = await axios.get<Movies>("/search/movie", {
                params: {
					page,
					query: word,
					language: 'en-US'
                }
            });
			
			setMoviesResults(data);

        } catch(e: any) {
            console.error(e.response ? e.response: e);
			Alert.alert("Error", e.message ? e.message : "There was a error when performing the search. Please verify your connection with the network.");
        } finally {
            setLoading(false);            
        }

	}

	const ListEmpty = () => {
		return (!loading) ? <View style={{ marginTop: 20 }}>
			<TextListEmpty>
				{(moviesResults && moviesResults.total_results === 0) ? 'Not found records :(' : 'The list is empty'}
			</TextListEmpty>
		</View> : <></>
	}

	useEffect(() => {
		if(word) {
			setMoviesResults({} as Movies);
			consult();
		};
	}, [page])

	return (
		<Container>			
			<ScrollView
				showsVerticalScrollIndicator                
				contentContainerStyle={{ 
					flexGrow: 1, 
					paddingVertical: 10,
					justifyContent: 'center',
					alignItems: 'center'
				}}
				style={{ 
					flex: 1, 
					width: '100%'
				}}
				keyboardShouldPersistTaps="always"      
			>
				<InputContainer>
					<SubInputContainer>					
						<LabelInput
							style={{
								left: (isInputFocused || word) ? 0 : 5,
								bottom: (isInputFocused || word) ? 40 : 8,
								fontSize:  (isInputFocused || word) ? 14 : 24,
							}}
						>
							Search by movie title
						</LabelInput>					
						<TextInput 
							value={word || ''}
							blurOnSubmit				
							onChangeText={(text) => {
								if(text === '') {
									setWord(null);
									setPage(1);
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
					</SubInputContainer>
				</InputContainer>				
				<ContainerList 
					style={{					
						backgroundColor: (
							!moviesResults.results || 
							moviesResults.results.length === 0 
						) ? 'transparent' : 'rgba(0, 0 , 0, 0.3)'
					}}
				>
					<ListMovies 
						data={moviesResults as Movies}
						loading={loading}
						numberOfColumns={2}
						horizontal={false}
						componentListEmpty={ListEmpty}
						functionRefresh={consult}
						lastRoute={'Search'}
						styleItem={{
							width: 150,
							height: 250,
							margin: 0,
							marginBottom: 20,
							padding: 0,
							alignItems: 'center',
							justifyContent: 'center'
						}}
						navigation={navigation}
						page={1}
					/>
				</ContainerList>
				{(moviesResults.results && moviesResults?.results?.length > 0) && (
					<PaginationList 
						page={page}
						setPage={setPage}
						totalPages={moviesResults.total_pages}
					/>
				)}
			</ScrollView>
		</Container>
	)

}

export default Search;