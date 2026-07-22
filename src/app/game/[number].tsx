import Ionicons from '@react-native-vector-icons/ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
	Alert,
	FlatList,
	ImageBackground,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { generateRandomBetween } from '@/utils';

import GuessLogItem from '@/components/game/GuessLogItem';
import NumberContainer from '@/components/game/NumberContainer';
import Card from '@/components/ui/Card';
import InstructionText from '@/components/ui/InstructionText';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Title from '@/components/ui/Title';

let minBoundary: number = 1;
let maxBoundary: number = 100;

const GameScreen = () => {
	const { number: userNumber } = useLocalSearchParams();

	const initialGuess = useMemo(
		() => generateRandomBetween(minBoundary, maxBoundary, Number(userNumber)),
		[userNumber],
	);

	const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
	const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

	const { width, height } = useWindowDimensions();

	useEffect(() => {
		if (currentGuess === Number(userNumber)) {
			router.push({
				pathname: '/game-over',
				params: { roundsNumber: guessRounds.length, userNumber: userNumber },
			});
		}
	}, [currentGuess, userNumber]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

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
		setGuessRounds((prevGuessRounds) => [newRandonNumber, ...prevGuessRounds]);
	};

	const guessRoundsListLength = guessRounds.length;

	let content = (
		<>
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
		</>
	);

	if (width > 500) {
		content = (
			<>
				<View style={styles.buttonsContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuess.bind(this, 'lower')}>
							<Ionicons name="remove" size={24} color="white" />
						</PrimaryButton>
					</View>
					<NumberContainer>{currentGuess}</NumberContainer>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuess.bind(this, 'higher')}>
							<Ionicons name="add" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</>
		);
	}

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
						{content}
						<View style={styles.listContainer}>
							<FlatList
								data={guessRounds}
								renderItem={(itemData) => (
									<GuessLogItem
										roundNumber={guessRoundsListLength - itemData.index}
										guess={itemData.item}
									/>
								)}
								keyExtractor={(guessRound) => guessRound.toString()}
							/>
						</View>
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
		flex: 1,
		padding: 12,
		alignItems: 'center',
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonsContainerWide: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});
