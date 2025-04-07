import FollowedPage from '@/modules/oportunities/followed-page';
import { OpportunityLayout } from '@/modules/oportunities/opportunity-layout';
import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { NotFound } from '../components/not-found';

const OpportunityPage = lazy(() => import('@/modules/oportunities/opportunity-page.tsx'));

export const MainRoutes = () => {
	return (
		<Routes>
			<Route element={<OpportunityLayout />}>
				<Route index element={<OpportunityPage />} />
				<Route path='/followed' element={<FollowedPage />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};
