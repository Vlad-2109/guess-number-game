import Ionicons from '@react-native-vector-icons/ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { generateRandomBetween } from '@/utils';

import NumberContainer from '@/components/game/NumberContainer';
import Card from '@/components/ui/Card';
import InstructionText from '@/components/ui/InstructionText';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Title from '@/components/ui/Title';

const GameScreen = () => {
	const { number: userNumber } = useLocalSearchParams();
	let minBoundary: number = 1;
	let maxBoundary: number = 100;

	const initialGuess = useMemo(
		() => generateRandomBetween(minBoundary, maxBoundary, Number(userNumber)),
		[userNumber],
	);

	const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

	useEffect(() => {
		if (currentGuess === Number(userNumber)) {
			router.push('/game-over');
		}
	}, [currentGuess, userNumber]);

	const nextGuess = (direction: 'lower' | 'higher') => {
		if (
			(direction === 'lower' && currentGuess < Number(userNumber)) ||
			(direction === 'higher' && currentGuess > Number(userNumber))
		) {
			Alert.alert("Don't lie!", 'You know that this is wrong...', [
				{ text: 'Sorry!', style: 'cancel' },
			]);
			return;
		}

		if (direction === 'lower') {
			maxBoundary = currentGuess - 1;
		} else {
			minBoundary = currentGuess + 1;
		}

		const newRandonNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess,
		);
		setCurrentGuess(newRandonNumber);
	};

	return (
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
				<SafeAreaView style={styles.container}>
					<View style={styles.gameContainer}>
						<Title>Opponent's Guess</Title>
						<NumberContainer>{currentGuess}</NumberContainer>
						<Card>
							<InstructionText style={styles.instructionText}>
								Higher or lower?
							</InstructionText>
							<View style={styles.buttonsContainer}>
								<View style={styles.buttonContainer}>
									<PrimaryButton onPress={nextGuess.bind(this, 'lower')}>
										<Ionicons name="remove" size={24} color="white" />
									</PrimaryButton>
								</View>
								<View style={styles.buttonContainer}>
									<PrimaryButton onPress={nextGuess.bind(this, 'higher')}>
										<Ionicons name="add" size={24} color="white" />
									</PrimaryButton>
								</View>
							</View>
						</Card>
						{/* <View>
							<Text>LOG ROUNDS</Text>
						</View> */}
					</View>
				</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
};

export default GameScreen;

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
	gameContainer: {
		padding: 12,
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
});
