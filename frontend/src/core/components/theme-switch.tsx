import { MoonIcon } from '@/core/icons/moon-icon';
import { SunIcon } from '@/core/icons/sun-icon';
import { Button } from '@heroui/button';
import { useTheme } from '@heroui/use-theme';

export const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark';

	const handleThemeChange = () => {
		setTheme(isDark ? 'light' : 'dark');
	};

	return (
		<Button
			isIconOnly
			aria-label={isDark ? 'Switch to dark mode' : 'Switch to light mode'}
			color='primary'
			radius='full'
			variant='flat'
			onPress={handleThemeChange}
		>
			{isDark ? <SunIcon size={22} /> : <MoonIcon size={22} />}
		</Button>
	);
};
