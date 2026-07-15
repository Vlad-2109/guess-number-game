import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';

import PrimaryButton from '@/components/ui/PrimaryButton';
import Title from '@/components/ui/Title';

export default function GameOverScreen() {
	const { roundsNumber, userNumber } = useLocalSearchParams();

	const startNewGame = () => {
		router.push('/');
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
					<Title>Game is over!</Title>
					<View style={styles.imageContainer}>
						<Image
							source={require('@/assets/images/success.png')}
							style={styles.imageSuccess}
						/>
					</View>
					<Text style={styles.summaryText}>
						Your phone needed{' '}
						<Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess
						the number <Text style={styles.highlight}>{userNumber}</Text>.
					</Text>
					<PrimaryButton onPress={startNewGame}>Start New Game</PrimaryButton>
				</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
}

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
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		width: 300,
		height: 300,
		marginVertical: 36,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: COLORS.primary800,
		overflow: 'hidden',
	},
	imageSuccess: {
		width: '100%',
		height: '100%',
	},
	summaryText: {
		fontFamily: 'open-sans',
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 24,
	},
	highlight: {
		fontFamily: 'open-sans-bold',
		color: COLORS.primary500,
	},
});
