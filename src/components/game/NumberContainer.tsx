import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';

type NumberContainerProps = {
	children: React.ReactNode;
};

const NumberContainer = ({ children }: NumberContainerProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.numberText}>{children}</Text>
		</View>
	);
};

export default NumberContainer;

const styles = StyleSheet.create({
	container: {
		padding: 24,
		margin: 24,
		borderWidth: 4,
		borderColor: COLORS.accent500,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	numberText: {
		color: COLORS.accent500,
		fontSize: 36,
		fontWeight: 'bold',
	},
});
