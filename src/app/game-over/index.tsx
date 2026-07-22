import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';

import PrimaryButton from '@/components/ui/PrimaryButton';
import Title from '@/components/ui/Title.ios';

export default function GameOverScreen() {
	const { roundsNumber, userNumber } = useLocalSearchParams();
	const { width, height } = useWindowDimensions();

	let imageSize = 300;

	if (width < 380) {
		imageSize = 150;
	}

	if (height < 410) {
		imageSize = 150;
	}

	const imageStyle = {
		width: imageSize,
		height: imageSize,
		borderRadius: imageSize / 2,
	};

	const paddingTopDistance = height < 410 ? 10 : 0;

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
				<ScrollView style={styles.screen}>
					<SafeAreaView
						style={[styles.container, { paddingTop: paddingTopDistance }]}
					>
						<Title>Game is over!</Title>
						<View style={[styles.imageContainer, imageStyle]}>
							<Image
								source={require('@/assets/images/success.png')}
								style={styles.imageSuccess}
							/>
						</View>
						<Text style={styles.summaryText}>
							Your phone needed{' '}
							<Text style={styles.highlight}>{roundsNumber}</Text> rounds to
							guess the number{' '}
							<Text style={styles.highlight}>{userNumber}</Text>.
						</Text>
						<PrimaryButton onPress={startNewGame}>Start New Game</PrimaryButton>
					</SafeAreaView>
				</ScrollView>
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
	screen: {
		flex: 1,
	},
	image: {
		opacity: 0.15,
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		marginVertical: 36,
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
