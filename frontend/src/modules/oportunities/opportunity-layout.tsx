import { Navbar } from '@/core/components/navbar';
import { useAppSelector } from '@/core/store/hooks';
import { Alert } from '@heroui/alert';
import { Outlet } from 'react-router';
import { FilterHeaders } from './components/filter-headers';
import { TabHeader } from './components/tab-header';

export const OpportunityLayout = () => {
	const { error } = useAppSelector((state) => state.opportunity);

	return (
		<div className='relative flex min-h-dvh flex-col'>
			<Navbar />
			<main className='container mx-auto flex-grow space-y-4 px-6 pt-4'>
				{error && <Alert title='Error' description={error} color='danger' isClosable />}
				<FilterHeaders />
				<TabHeader />
				<Outlet />
			</main>
			<footer className='flex w-full items-center justify-center py-3'>
				<p className='text-sm text-default-500'>
					© {new Date().getFullYear()} Todos los derechos reservados.
				</p>
			</footer>
		</div>
	);
};
