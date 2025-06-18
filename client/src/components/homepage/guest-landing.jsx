import { Button, CardBody, CardHeader } from "@heroui/react";
import { CgGoogle } from 'react-icons/cg'
import { API_URL } from "../../lib/constants";

function GuestLanding() {
    return (
        <>
            <CardHeader>
                <h1 className='text-xl'>Guest Landing</h1>
            </CardHeader>
            <CardBody>
                <a href={`${API_URL}/login`}>
                    <Button
                        radius="full"
                        size="lg"
                        variant="solid"
                        color="primary"
                        startContent={<CgGoogle size={24} />}
                    >
                        Acceder con Google
                    </Button>

                </a>
            </CardBody>
        </>
    )
}

export default GuestLanding
