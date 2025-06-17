import { useEffect, useState } from 'react'
import { useLoaderData } from "react-router";
import { API_URL } from '../lib/constants';

import { Button, Card, CardBody, CardHeader, Form } from "@heroui/react";
import MapPicker from '../components/map/mapPicker';

function HomePage() {
    const { profile } = useLoaderData();

    return (
        <>
            <Card className=''>
                <CardHeader>
                    <h1 className='text-xl'>Homepage</h1>
                </CardHeader>
                <CardBody>
                    {!profile?.id && <a href={`${API_URL}/login`}>
                        <Button color="primary">Sign in with Google</Button>
                    </a>}
                    {profile?.id &&
                        <Form action={`${API_URL}/logout`} method='post'>
                            <Button color="secondary" type='submit'>Logout</Button>
                        </Form>
                    }

                    {profile?.id && <p>Name: {profile.username}, Nick{profile.displayName}, UUID: {profile.id}</p>}

                    <MapPicker />
                </CardBody>
            </Card>
        </>
    )
}

export default HomePage
