import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../components/admin/admin-header";

function AdminLists() {
  return (
    <>
      <Card className="p-2">
        <AdminHeader crumbs={[{ title: "Listas" }]} />
        <Divider />
        <CardBody className="flex flex-col gap-2">Lists Content</CardBody>
      </Card>
    </>
  );
}

export default AdminLists;
