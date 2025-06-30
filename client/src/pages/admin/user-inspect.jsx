import {
    Card,
    CardBody,
    Divider,
} from "@heroui/react";

import AdminHeader from "../../components/admin/admin-header";
import { useLoaderData } from "react-router";

function AdminUsersInspect() {
    const { profile } = useLoaderData();
    const { displayName, uuid } = profile

    return (
        <>
            <Card className='p-2'>
                <AdminHeader current={'Usuarios'} user={displayName ?? uuid} />
                <Divider />
                <CardBody>
                    {JSON.stringify(profile)}
                </CardBody>
            </Card>
        </>
    )
}

export default AdminUsersInspect
