import { TabHeader } from '@/modules/oportunities/components/tab-header';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('TabHeader', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	const renderWithRouter = () => {
		return render(
			<MemoryRouter>
				<TabHeader />
			</MemoryRouter>,
		);
	};

	it('Should render the tab header', () => {
		renderWithRouter();
		expect(screen.getAllByRole('tab').length).toBe(2);
	});
});
