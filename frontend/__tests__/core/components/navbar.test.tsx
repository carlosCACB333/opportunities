import { Navbar } from '@/core/components/navbar';
import { cleanup, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mocks
vi.mock('@/core/components/theme-switch', () => ({
	ThemeSwitch: () => <div data-testid='theme-switch' />,
}));

vi.mock('@/core/icons/logo', () => ({
	Logo: () => <div data-testid='logo'>Mock Logo</div>,
}));

describe('Navbar', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	it('should render navigation', () => {
		const navbar = render(<Navbar />);
		expect(navbar.getByRole('navigation')).toBeTruthy();
	});

	it('should render logo', () => {
		const navbar = render(<Navbar />);
		const logo = navbar.getByTestId('logo');
		expect(logo).toBeTruthy();
	});

	it('should render theme switch', () => {
		const navbar = render(<Navbar />);

		const themeSwitch = navbar.getAllByTestId('theme-switch');
		expect(themeSwitch).toBeTruthy();
		expect(themeSwitch.length).toBe(2);
	});

	it('should render brand name', () => {
		const navbar = render(<Navbar />);
		const brandName = navbar.getByText(/Oportunidades de Negocio/i);
		expect(brandName).toBeTruthy();
	});
});
