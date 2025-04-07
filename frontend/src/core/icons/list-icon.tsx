import { IconSvgProps } from '@/core/types';
import * as React from 'react';

export const ListIcon: React.FC<IconSvgProps> = ({ size = 24, height, ...props }) => (
	<svg
		height={size || height}
		width={size || height}
		stroke='currentColor'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth='2'
		data-darkreader-inline-stroke=''
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		fill='currentColor'
		{...props}
	>
		<path d='M9 6l11 0'></path>
		<path d='M9 12l11 0'></path>
		<path d='M9 18l11 0'></path>
		<path d='M5 6l0 .01'></path>
		<path d='M5 12l0 .01'></path>
		<path d='M5 18l0 .01'></path>
	</svg>
);
