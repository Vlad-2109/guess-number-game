import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
	Alert,
	ImageBackground,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';

import Card from '@/components/ui/Card';
import InstructionText from '@/components/ui/InstructionText';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Title from '@/components/ui/Title';

const StartGame = () => {
	const router = useRouter();

	const [enteredNumber, setEnteredNumber] = useState<string>('');

	const { height } = useWindowDimensions();

	const paddingTopDistance = height < 420 ? 50 : 100;

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

		router.push(`/game/${chosenNumber}`);
	};

	return (
		<>
			<StatusBar style="light" />
			<LinearGradient
				colors={[COLORS.primary700, COLORS.accent500]}
				style={styles.gradientContainer}
			>
				<ImageBackground
					source={require('@/assets/images/background.png')}
					resizeMode="cover"
					imageStyle={styles.image}
					style={styles.imageBackground}
				>
					<ScrollView style={styles.screen}>
						<KeyboardAvoidingView style={styles.screen} behavior="position">
							<SafeAreaView
								style={[styles.container, { paddingTop: paddingTopDistance }]}
							>
								<Title>Guess My Number</Title>
								<Card>
									<InstructionText>Enter a number</InstructionText>
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
											<PrimaryButton onPress={confirmInput}>
												Confirm
											</PrimaryButton>
										</View>
									</View>
								</Card>
							</SafeAreaView>
						</KeyboardAvoidingView>
					</ScrollView>
				</ImageBackground>
			</LinearGradient>
		</>
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
	screen: {
		flex: 1,
	},
	container: {
		flex: 1,
		alignItems: 'center',
	},
	numberInput: {
		height: 50,
		width: 50,
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
		color: COLORS.accent500,
		borderBottomWidth: 2,
		borderBottomColor: COLORS.accent500,
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
