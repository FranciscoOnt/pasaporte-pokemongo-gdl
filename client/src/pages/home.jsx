import { useOutletContext } from "react-router";

import { Card } from "@heroui/react";

import UserLanding from "../components/homepage/user-landing";
import GuestLanding from "../components/homepage/guest-landing";

function HomePage() {
    const { profile } = useOutletContext();
    const isLoggedIn = (profile && profile.id)

    return (
        <Card className=''>
            {isLoggedIn ?
                <UserLanding profile={profile} /> :
                <GuestLanding />}
        </Card>
    )
}

export default HomePage
