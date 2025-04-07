import { HeroUIProvider } from '@heroui/system';
import { Provider as StoreProvider } from 'react-redux';
import { NavigateOptions, useHref, useNavigate } from 'react-router';
import { MainRoutes } from './core/routes/main-routes.tsx';
import { store } from './core/store/store';

declare module '@react-types/shared' {
	interface RouterConfig {
		routerOptions: NavigateOptions;
	}
}

export const App = () => {
	const navigate = useNavigate();

	return (
		<>
			<HeroUIProvider navigate={navigate} useHref={useHref} locale='es-PE'>
				<StoreProvider store={store}>
					<MainRoutes />
				</StoreProvider>
			</HeroUIProvider>
		</>
	);
};
