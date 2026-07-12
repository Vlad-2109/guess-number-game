import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
	Alert,
	ImageBackground,
	Platform,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '@/components/PrimaryButton';

const StartGame = () => {
	const [enteredNumber, setEnteredNumber] = useState<string>('');

	const handleNumberInput = (enteredText: string) => {
		setEnteredNumber(enteredText);
	};

	const resetInput = () => {
		setEnteredNumber('');
	};

	const confirmInput = () => {
		const chosenNumber = parseInt(enteredNumber);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				'Invalid number!',
				'Number has to be a number between 1 and 99',
				[
					{
						text: 'Okay',
						style: 'destructive',
						onPress: resetInput,
					},
				],
			);
			return;
		}

		console.log('Valid number!');
	};

	return (
		<LinearGradient
			colors={['#4e0329', '#ddb52f']}
			style={styles.gradientContainer}
		>
			<ImageBackground
				source={require('@/assets/images/background.png')}
				resizeMode="cover"
				imageStyle={styles.image}
				style={styles.imageBackground}
			>
				<SafeAreaView style={styles.container}>
					<View style={styles.inputContainer}>
						<TextInput
							value={enteredNumber}
							onChangeText={handleNumberInput}
							style={styles.numberInput}
							maxLength={2}
							keyboardType="number-pad"
							autoCapitalize="none"
							autoCorrect={false}
						/>
						<View style={styles.buttonsContainer}>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={resetInput}>Reset</PrimaryButton>
							</View>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={confirmInput}>Confirm</PrimaryButton>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
};

export default StartGame;

const styles = StyleSheet.create({
	gradientContainer: {
		flex: 1,
	},
	imageBackground: {
		flex: 1,
	},
	image: {
		opacity: 0.15,
	},
	container: {
		flex: 1,
	},
	inputContainer: {
		marginTop: 50,
		padding: 16,
		marginHorizontal: 24,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#4e0329',
		borderRadius: 8,
		...Platform.select({
			android: {
				elevation: 4,
			},
			ios: {
				shadowColor: 'black',
				shadowOffset: { width: 0, height: 2 },
				shadowRadius: 6,
				shadowOpacity: 0.25,
			},
			default: {},
		}),
	},
	numberInput: {
		height: 50,
		width: 50,
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#ddb52f',
		borderBottomWidth: 2,
		borderBottomColor: '#ddb52f',
		marginVertical: 8,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		flex: 1,
	},
});
