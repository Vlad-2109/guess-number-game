import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { COLORS } from '@/constants/colors';

type InstructionTextProps = {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
};

const InstructionText = ({ children, style }: InstructionTextProps) => {
	return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
	instructionText: {
		color: COLORS.accent500,
		fontSize: 24,
		fontFamily: 'open-sans',
	},
});
