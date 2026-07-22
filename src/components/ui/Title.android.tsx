import { StyleSheet, Text } from 'react-native';

type TitleProps = {
	children: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
	return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontFamily: 'open-sans',
		color: 'white',
		textAlign: 'center',
		borderWidth: 2,
		borderColor: 'white',
		padding: 12,
		borderRadius: 8,
		maxWidth: '80%',
		width: 300,
	},
});
