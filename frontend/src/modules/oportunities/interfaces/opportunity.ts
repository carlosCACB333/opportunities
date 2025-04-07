export interface Opportunity {
	code: string;
	title: string;
	type: string;
	is_followed: boolean;
	publish_date: string;
	close_date: string;
}

export enum OpportunityType {
	AGILE = 'agile',
	TENDER = 'tender',
}

export interface OpportunitySearchQuery {
	start_date?: string;
	end_date?: string;
	type?: OpportunityType;
}
