import { Outlet, useLoaderData } from "react-router";

import {
    Navbar,
    NavbarContent,
    useDisclosure
} from "@heroui/react";
import { useEffect } from "react";
import PageLogo from "../components/layout/page-logo";
import ThemeSwitcher from "../components/layout/theme-switcher";
import UserProfile from "../components/layout/user-profile";
import Footer from "../components/layout/footer";
import UserModal from "../components/homepage/user-modal";

function Layout() {
    const { profile } = useLoaderData();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const isLoggedIn = (profile && profile.id)

    useEffect(() => {
        if (isLoggedIn && !profile.displayName) {
            onOpen()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    {isLoggedIn && <UserProfile profile={profile} editProfile={onOpen} />}
                </NavbarContent>
                <UserModal {...{ isOpen, onOpenChange, profile: profile }} />
            </Navbar>
            <div className='mx-auto mb-auto w-full md:max-w-7xl p-2 md:p-4'>
                <Outlet context={{ profile: profile }} />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
