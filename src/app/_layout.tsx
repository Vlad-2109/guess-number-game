import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
	SafeAreaProvider,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		'open-sans': require('@/assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('@/assets/fonts/OpenSans-Bold.ttf'),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<Stack screenOptions={{ headerShown: false }} />
		</SafeAreaProvider>
	);
}
