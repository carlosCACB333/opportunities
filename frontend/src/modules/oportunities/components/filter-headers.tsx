import { Button } from '@heroui/button';
import { DatePicker } from '@heroui/date-picker';
import { Select, SelectItem } from '@heroui/select';
import { parseDate } from '@internationalized/date';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { OpportunityType } from '../interfaces/opportunity';

export const FilterHeaders = () => {
	const [params, setParams] = useSearchParams();
	const type = params.get('type') || 'all';
	const startDate = params.get('start_date');
	const endDate = params.get('end_date');
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<header className='flex items-center gap-4 max-md:flex-col max-md:items-end'>
			<DatePicker
				showMonthAndYearPickers
				label='Fecha de publicación desde:'
				value={startDate ? parseDate(startDate) : null}
				onChange={(date) => {
					if (date) {
						params.set('start_date', date.toString());
					} else {
						params.delete('start_date');
					}
					setParams(params);
				}}
				maxValue={endDate ? parseDate(endDate) : undefined}
				aria-label='Fecha de publicación desde'
			/>
			<DatePicker
				showMonthAndYearPickers
				label='Fecha de publicación hasta:'
				value={endDate ? parseDate(endDate) : null}
				onChange={(date) => {
					if (date) {
						params.set('end_date', date.toString());
					} else {
						params.delete('end_date');
					}
					setParams(params);
				}}
				minValue={startDate ? parseDate(startDate) : undefined}
				aria-label='Fecha de publicación hasta'
			/>

			<Select
				label='Tipo'
				disallowEmptySelection
				selectedKeys={[type]}
				onSelectionChange={(key) => {
					const value = key.currentKey || '';
					if (value === 'all') {
						params.delete('type');
					} else {
						params.set('type', value);
					}
					setParams(params);
				}}
				aria-label='Tipo de oportunidad'
			>
				<SelectItem key='all'>Todos</SelectItem>
				<SelectItem key={OpportunityType.TENDER}>Licitación</SelectItem>
				<SelectItem key={OpportunityType.AGILE}>Compra ágil</SelectItem>
			</Select>

			<div>
				<Button
					color='primary'
					size='lg'
					variant='bordered'
					onPress={() => {
						navigate(pathname);
					}}
					aria-label='Limpiar filtros'
				>
					Limpiar filtros
				</Button>
			</div>
		</header>
	);
};
