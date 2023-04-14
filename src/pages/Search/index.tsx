import React, { useEffect, useState } from 'react'
import { 
	View, 
	TextInput, 
	TouchableOpacity, 
	RefreshControl, 
	Modal,	
	Pressable
} from 'react-native'
import { FlashList } from '@shopify/flash-list';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

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
import { Movies } from '../../interfaces/home';
import axios from '../../../api';
import ItemList from '../../components/ItemList';
import { RootDrawerParamList } from '../../routes/navigationTypes';

interface SearchProps {
    navigation: DrawerNavigationProp<RootDrawerParamList, 'Search'>;
    route: RouteProp<RootDrawerParamList, 'Search'>;
}

function Search({ navigation }: SearchProps) {

	const [word, setWord] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
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
            console.error(e?.response ? e.response: e);
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
			{(moviesResults.results && moviesResults?.results?.length > 0) && (
				<ContainerPagination>
					<PaginationBoxArrow
						style={{
							opacity: page > 1 ? 1 : 0.5
						}}
						onPress={() => {
							if(page > 1 ) setPage(page -1);
						}}
					>
						<FontAwesome 
							name='arrow-left'
							size={24}			
							color={'white'}				
						/>
					</PaginationBoxArrow>
					<PageText>
						{page} - {moviesResults.total_pages ?? 1}
					</PageText> 
					<PaginationBoxArrow
						style={{
							opacity: page === moviesResults.total_pages ? 0.5 : 1
						}}
						onPress={() => {
							if(page < moviesResults.total_pages) setPage(page + 1);
						}}
					>
						<FontAwesome 
							name='arrow-right'
							size={24}			
							color={'white'}				
						/>
					</PaginationBoxArrow>
				</ContainerPagination>
			)}
			<ContainerList 
				style={{					
					backgroundColor: (
						!moviesResults.results || 
						moviesResults.results.length === 0 
					) ? 'transparent' : 'rgba(0, 0 , 0, 0.3)'
				}}
			>
				<FlashList 
					data={moviesResults.results}
					keyExtractor={(movie) => movie.id.toString()}
					estimatedItemSize={(moviesResults.results && moviesResults?.results?.length) ? moviesResults?.results?.length : undefined}
					showsVerticalScrollIndicator					
					refreshing={loading}
					ListEmptyComponent={ListEmpty}
					numColumns={2}     					
					renderItem={({ item, index }) => (
						<ItemList 
							lastRoute={'Search'}
							item={item}
							navigation={navigation}
							styleContainer={{
								width: 150,
								height: 250,
								margin: 0,
								marginBottom: 20,
								padding: 0,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						/>
					)}  					
					refreshControl={
						<RefreshControl 
							refreshing={loading || false}
							tintColor={'#182C6C'}
							colors={['#182C6C']}
							progressBackgroundColor={'white'}
							onRefresh={consult}	
						/>
					}
				/>	
			</ContainerList>
			{/* <Modal
				animationType='fade'
				visible={showModal}
				onRequestClose={() => setShowModal(false)}
				transparent
			>
				<Pressable style={{
					flexGrow: 1,
					width: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.6)',
					alignItems: 'center',
					justifyContent:'center'
				}}
				onPress={() => setShowModal(false)}
				>
					<View style={{
						height: 400,
						backgroundColor: '#0b1b49eb',
						borderRadius: 5,
						borderWidth: 1,
						borderColor: '#FFF',						
						width: 300,
						padding: 15
					}}>
						<View
							style={{
								width: '100%',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								borderBottomWidth: 1,
								paddingBottom: 5,
								borderColor: '#FFF'
							}}
						>
							<Text 
								style={{
									color: 'white',
									fontWeight: 'bold',
									fontSize: 24
								}}
							>
								Filters
							</Text>
							<TouchableOpacity
								style={{
									alignItems: 'center',
									justifyContent: 'center'
								}}
								activeOpacity={0.4}
								onPress={() => setShowModal(false)}
							>
								<AntDesign 
									name={'closecircle'}
									color={'gray'}
									size={28}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View>

					</View>
				</Pressable>
			</Modal> */}
		</Container>

	)

}

export default Search;