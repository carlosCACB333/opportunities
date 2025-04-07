import { useAppDispatch } from '@/core/store/hooks';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { ListContent } from './components/list-content';
import { OpportunityType } from './interfaces/opportunity';
import { fetchOpportunities } from './oppotunity-api';

const OpportunityPage = () => {
	const [params] = useSearchParams();
	const dispatch = useAppDispatch();

	const startDate = params.get('start_date') || undefined;
	const endDate = params.get('end_date') || undefined;
	const type = params.get('type') || undefined;

	useEffect(() => {
		dispatch(
			fetchOpportunities({
				start_date: startDate,
				end_date: endDate,
				type: type as OpportunityType,
			}),
		);
	}, [dispatch, startDate, endDate, type]);

	return (
		<>
			<ListContent />
		</>
	);
};

export default OpportunityPage;
