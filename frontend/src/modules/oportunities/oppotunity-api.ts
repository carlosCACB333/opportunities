import { envs } from '@/core/config/envs';
import { createAppAsyncThunk } from '@/core/store/with-types';
import { Opportunity, OpportunitySearchQuery } from './interfaces/opportunity';

export const fetchOpportunities = createAppAsyncThunk<
	Opportunity[],
	OpportunitySearchQuery,
	{ rejectValue: string }
>(
	'opportunities/fetchOpportunities',
	async (params: OpportunitySearchQuery, { rejectWithValue }) => {
		try {
			const queryParams = new URLSearchParams();

			if (params.start_date) {
				queryParams.append('startDate', params.start_date);
			}

			if (params.end_date) {
				queryParams.append('endDate', params.end_date);
			}

			if (params.type) {
				queryParams.append('type', params.type);
			}

			const response = await fetch(
				`${envs.VITE_API_URL}/opportunities?${queryParams.toString()}`,
			);

			const data = await response.json();

			if (response.status !== 200) {
				throw new Error(data.message || 'Error fetching opportunities');
			}

			return data as Opportunity[];
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const fetchFollowedOpportunities = createAppAsyncThunk<
	Opportunity[],
	OpportunitySearchQuery,
	{ rejectValue: string }
>(
	'opportunities/fetchFollowedOpportunities',
	async (params: OpportunitySearchQuery, { rejectWithValue }) => {
		try {
			const queryParams = new URLSearchParams();

			if (params.start_date) {
				queryParams.append('startDate', params.start_date);
			}

			if (params.end_date) {
				queryParams.append('endDate', params.end_date);
			}

			if (params.type) {
				queryParams.append('type', params.type);
			}

			const response = await fetch(
				`${envs.VITE_API_URL}/opportunities/followed?${queryParams.toString()}`,
			);

			const data = await response.json();

			if (response.status !== 200) {
				throw new Error(data.message || 'Error fetching opportunities');
			}

			return data as Opportunity[];
		} catch (error) {
			console.error(error);
			return rejectWithValue((error as Error).message);
		}
	},
);

export const toggleFollowOpportunity = createAppAsyncThunk<
	Opportunity,
	{ code: string },
	{ rejectValue: string }
>('opportunities/toggleFollowOpportunity', async ({ code }, { rejectWithValue }) => {
	try {
		const response = await fetch(`${envs.VITE_API_URL}/opportunities/${code}/follow`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		if (response.status !== 200) {
			throw new Error(data.message || 'Error toggling follow opportunity');
		}

		return data as Opportunity;
	} catch (error) {
		return rejectWithValue((error as Error).message);
	}
});
