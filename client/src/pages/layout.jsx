import { Outlet, useLoaderData } from "react-router";

import {
    Navbar,
    NavbarContent,
} from "@heroui/react";
import { useState } from "react";
import PageLogo from "../components/layout/page-logo";
import ThemeSwitcher from "../components/layout/theme-switcher";
import UserProfile from "../components/layout/user-profile";
import Footer from "../components/layout/footer";

function Layout() {
    const { profile } = useLoaderData();
    const [userProfile, setUserProfile] = useState(profile);
    const isLoggedIn = (profile && profile.id)

    return (
        <div className='flex flex-col justify-between w-full min-h-screen'>
            <Navbar
                className='flex-none bg-blue-950 text-primary-foreground'
                isBordered
                isBlurred={false}
                maxWidth="xl"
            >
                <PageLogo />
                <NavbarContent justify="end">
                    <ThemeSwitcher />
                    {isLoggedIn && <UserProfile profile={userProfile} />}
                </NavbarContent>
            </Navbar>
            <div className='mx-auto mb-auto w-full md:max-w-7xl p-2 md:p-4'>
                <Outlet context={{ profile: userProfile }} />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
