import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminActions from "../components/admin/actions";
import { IoMdHome } from "react-icons/io";
import AdminHeader from "../components/admin/admin-header";

function AdminLanding() {
  return (
    <>
      <Card className="p-2">
        <AdminHeader crumbs={[]} />
        <Divider />
        <CardBody>
          <AdminActions />
        </CardBody>
      </Card>
    </>
  );
}

export default AdminLanding;
