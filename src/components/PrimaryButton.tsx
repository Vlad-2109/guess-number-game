import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';

type PrimaryButtonProps = {
	children: React.ReactNode;
	onPress?: () => void;
};

const PrimaryButton = ({ children, onPress }: PrimaryButtonProps) => {
	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				onPress={onPress}
				android_ripple={{ color: COLORS.primary600 }}
				style={({ pressed }) => [
					styles.buttonInnerContainer,
					pressed && styles.pressed,
				]}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
};

export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: 'hidden',
	},
	buttonInnerContainer: {
		backgroundColor: COLORS.primary500,
		paddingVertical: 8,
		paddingHorizontal: 16,
		...Platform.select({
			android: {
				elevation: 2,
			},
			default: {},
		}),
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
	pressed: {
		opacity: 0.75,
	},
});
