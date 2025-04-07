import { ThemeSwitch } from '@/core/components/theme-switch';
import { useTheme } from '@heroui/use-theme';
import { cleanup, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@heroui/use-theme', () => ({
	useTheme: vi.fn(),
}));

describe('ThemeSwitch', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	it('should render the button with light mode icon', () => {
		const setTheme = vi.fn();
		(useTheme as unknown as any).mockReturnValue({ theme: 'dark', setTheme });

		const { getByLabelText } = render(<ThemeSwitch />);
		expect(getByLabelText(/switch to dark mode/i)).toBeTruthy();
	});

	it('should render the button with dark mode icon', () => {
		const setTheme = vi.fn();
		(useTheme as unknown as any).mockReturnValue({ theme: 'light', setTheme });

		const { getByLabelText } = render(<ThemeSwitch />);
		expect(getByLabelText(/switch to light mode/i)).toBeTruthy();
	});

	it('should call setTheme with light mode when dark mode is active', () => {
		const setTheme = vi.fn();
		(useTheme as unknown as any).mockReturnValue({ theme: 'dark', setTheme });

		const { getByLabelText } = render(<ThemeSwitch />);
		getByLabelText(/switch to dark mode/i).click();

		expect(setTheme).toHaveBeenCalledWith('light');
	});

	it('should call setTheme with dark mode when light mode is active', () => {
		const setTheme = vi.fn();
		(useTheme as unknown as any).mockReturnValue({ theme: 'light', setTheme });

		const { getByLabelText } = render(<ThemeSwitch />);
		getByLabelText(/switch to light mode/i).click();

		expect(setTheme).toHaveBeenCalledWith('dark');
	});
});
