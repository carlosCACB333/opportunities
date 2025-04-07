import { ThemeSwitch } from '@/core/components/theme-switch';
import { Logo } from '@/core/icons/logo';
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';

export const Navbar = () => {
	return (
		<HeroUINavbar maxWidth='2xl' position='sticky'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				<NavbarBrand className='flex max-w-fit items-center gap-3'>
					<Logo />
					<p className='line-clamp-1 text-wrap text-xl font-bold'>
						Oportunidades de Negocio
					</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden basis-1/5 sm:flex sm:basis-full' justify='end'>
				<NavbarItem className='hidden gap-2 sm:flex'>
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className='basis-1 pl-4 sm:hidden' justify='end'>
				<ThemeSwitch />
			</NavbarContent>
		</HeroUINavbar>
	);
};
