import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NumberContainer from '@/components/game/NumberContainer';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Title from '@/components/ui/Title';
import { COLORS } from '@/constants/colors';
import { generateRandomBetween } from '@/utils';

const GameScreen = () => {
	const { number: userNumber } = useLocalSearchParams();
	let minBoundary: number = 1;
	let maxBoundary: number = 100;

	const initialGuess = useMemo(
		() => generateRandomBetween(minBoundary, maxBoundary, Number(userNumber)),
		[userNumber],
	);

	const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

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
						<View>
							<Text>Higher or lower?</Text>
							<View>
								<PrimaryButton onPress={nextGuess.bind(this, 'lower')}>
									-
								</PrimaryButton>
								<PrimaryButton onPress={nextGuess.bind(this, 'higher')}>
									+
								</PrimaryButton>
							</View>
						</View>
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
});
