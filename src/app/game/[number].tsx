import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Title from '@/components/Title';
import { COLORS } from '@/constants/colors';

const GameScreen = () => {
	const { number } = useLocalSearchParams();
	console.log('Number from page:', number);

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
						{/* <Text>Guess</Text> */}
						<View>
							<Text>Higher or lower?</Text>
							{/* <Text>+</Text>
							<Text>-</Text> */}
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
