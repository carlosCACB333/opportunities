import { FilterHeaders } from '@/modules/oportunities/components/filter-headers';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('FilterHeaders', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	const renderWithRouter = () => {
		return render(
			<MemoryRouter>
				<FilterHeaders />
			</MemoryRouter>,
		);
	};

	it('Should render the filter headers', () => {
		renderWithRouter();

		expect(screen.getAllByLabelText(/fecha de publicación desde/i).length).toBeGreaterThan(0);
		expect(screen.getAllByLabelText(/fecha de publicación hasta/i).length).toBeGreaterThan(0);
		expect(screen.getAllByLabelText(/tipo de oportunidad/i).length).toBeGreaterThan(0);
	});
});
