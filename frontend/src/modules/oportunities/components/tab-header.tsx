import { ListIcon } from '@/core/icons/list-icon';
import { StarFilled } from '@/core/icons/star-filled';
import { Tab, Tabs } from '@heroui/tabs';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

const tabs = [
	{
		key: '/',
		title: (
			<div className='flex items-center space-x-2'>
				<ListIcon size={20} />
				<span>Todas</span>
			</div>
		),
	},
	{
		key: '/followed',
		title: (
			<div className='flex items-center space-x-2'>
				<StarFilled size={20} />
				<span>Siguiendo</span>
			</div>
		),
	},
];

export const TabHeader = () => {
	const [params] = useSearchParams();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<Tabs
			aria-label='Options'
			color='primary'
			size='lg'
			selectedKey={pathname}
			onSelectionChange={(key) => {
				navigate(key.toString() + `?${params.toString()}`);
			}}
			aria-labelledby='opportunity-tabs'
		>
			{tabs.map((tab) => (
				<Tab key={tab.key} title={tab.title} aria-label='Tab' />
			))}
		</Tabs>
	);
};
