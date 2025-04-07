import { IconSvgProps } from '@/core/types';
import * as React from 'react';

export const StarOutlined: React.FC<IconSvgProps> = ({ size = 24, height, ...props }) => (
	<svg
		fill='none'
		height={size || height}
		width={size || height}
		viewBox='0 0 24 24'
		stroke='currentColor'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth='2'
		data-darkreader-inline-stroke=''
		{...props}
	>
		<path d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z'></path>
	</svg>
);
