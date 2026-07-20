import { COLORS } from '@/constants/colors';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

type CardProps = {
	children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
	return <View style={styles.card}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	card: {
		marginTop: deviceWidth < 380 ? 18 : 36,
		padding: 16,
		marginHorizontal: 24,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: COLORS.primary800,
		borderRadius: 8,
		...Platform.select({
			android: {
				elevation: 4,
			},
			ios: {
				shadowColor: 'black',
				shadowOffset: { width: 0, height: 2 },
				shadowRadius: 6,
				shadowOpacity: 0.25,
			},
			default: {},
		}),
	},
});
