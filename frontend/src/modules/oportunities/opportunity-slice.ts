import { createSlice } from '@reduxjs/toolkit';
import { Opportunity } from './interfaces/opportunity';
import {
	fetchFollowedOpportunities,
	fetchOpportunities,
	toggleFollowOpportunity,
} from './oppotunity-api';

interface OpportunitiesState {
	opportunities: Opportunity[];
	loading: boolean;
	error: string | string[] | null;
}

const initialState: OpportunitiesState = {
	error: null,
	loading: false,
	opportunities: [],
};

export const opportunitySlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchOpportunities.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOpportunities.fulfilled, (state, action) => {
				state.loading = false;
				state.opportunities = action.payload;
			})
			.addCase(fetchOpportunities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || null;
			})
			.addCase(fetchFollowedOpportunities.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFollowedOpportunities.fulfilled, (state, action) => {
				state.loading = false;
				state.opportunities = action.payload;
			})
			.addCase(fetchFollowedOpportunities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || null;
			})
			.addCase(toggleFollowOpportunity.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(toggleFollowOpportunity.fulfilled, (state, action) => {
				state.loading = false;

				state.opportunities = state.opportunities.map((opportunity) =>
					opportunity.code === action.payload.code ? action.payload : opportunity,
				);
			})
			.addCase(toggleFollowOpportunity.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || null;
			});
	},
});
