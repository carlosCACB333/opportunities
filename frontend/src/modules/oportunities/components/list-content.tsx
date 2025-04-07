import { StarFilled } from '@/core/icons/star-filled';
import { StarOutlined } from '@/core/icons/star-outlined';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import { toggleFollowOpportunity } from '../oppotunity-api';

const format = new Intl.DateTimeFormat('es-PE', {
	timeZone: 'America/Lima',
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

export const ListContent = () => {
	const dispatch = useAppDispatch();

	const { opportunities, loading } = useAppSelector((state) => state.opportunity);

	const handleToggleFollow = (code: string) => {
		dispatch(toggleFollowOpportunity({ code }));
	};

	const formatDate = (date: string) => {
		return format.format(new Date(date));
	};

	return (
		<Table aria-label='lista de oportunidades'>
			<TableHeader>
				<TableColumn>CODIGO</TableColumn>
				<TableColumn>TÍTULO</TableColumn>
				<TableColumn>TIPO</TableColumn>
				<TableColumn>FECHA DE PUBLICACIÓN</TableColumn>
				<TableColumn>FECHA DE CIERRE</TableColumn>
				<TableColumn>SEGUIR</TableColumn>
			</TableHeader>
			<TableBody
				items={opportunities}
				emptyContent='No hay oportunidades'
				loadingContent={<Spinner variant='spinner' />}
				isLoading={loading}
			>
				{(item) => (
					<TableRow key={item.code}>
						<TableCell>{item.code}</TableCell>
						<TableCell>{item.title}</TableCell>
						<TableCell>{item.type}</TableCell>
						<TableCell>{formatDate(item.publish_date)}</TableCell>
						<TableCell>{formatDate(item.close_date)}</TableCell>
						<TableCell>
							<Button
								isIconOnly
								variant='light'
								color='primary'
								onPress={() => handleToggleFollow(item.code)}
								isLoading={loading}
								isDisabled={loading}
								aria-label={item.is_followed ? 'Dejar de seguir' : 'Seguir'}
							>
								{item.is_followed ? <StarFilled /> : <StarOutlined />}
							</Button>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
