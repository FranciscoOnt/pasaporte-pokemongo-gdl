import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminActions from "../components/admin/actions";
import { IoMdHome } from "react-icons/io";
import AdminHeader from "../../components/admin/admin-header";

function AdminSites() {
    return (
        <>
            <Card className='p-2'>
                <AdminHeader current={'Lugares'} />
                <Divider />
                <CardBody>
                    Sites Content
                </CardBody>
            </Card>
        </>
    )
}

export default AdminSites
