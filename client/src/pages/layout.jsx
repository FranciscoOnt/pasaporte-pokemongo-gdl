import { NavLink, Outlet, useLoaderData } from "react-router";
import { useTheme } from "@heroui/use-theme";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Avatar,
} from "@heroui/react";

function Layout() {
    const { theme, setTheme } = useTheme()
    const { profile } = useLoaderData();

    return (
        <div className='w-full min-h-screen'>
            <Navbar className='flex-none' isBordered isBlurred={false} maxWidth="xl">
                <NavbarBrand>
                    <NavLink to="/">
                        <h1 className="font-bold text-inherit">LOGO</h1>
                    </NavLink>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem justify="end">
                        <Button onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')} isIconOnly >
                            {theme}
                        </Button>
                    </NavbarItem>
                    {profile.isAdmin && <NavbarItem >
                        <NavLink to="/admin">
                            <Button
                                color="primary"
                                variant="bordered"
                            >
                                Administrar
                            </Button>
                        </NavLink>
                    </NavbarItem>}
                    <NavbarItem justify="end">
                        {profile.id && <Avatar isBordered showFallback name={profile.displayName} />}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className='flex flex-col m-auto justify-center w-full md:max-w-7xl'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
