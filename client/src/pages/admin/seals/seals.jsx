import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../../components/admin/admin-header";
import { Link } from "react-router";

function AdminSeals() {
  return (
    <>
      <Card className="p-2">
        <AdminHeader crumbs={[{ title: "Sellos" }]} />
        <Divider />
        <CardBody className="flex flex-col gap-2">
          Seals Content
          <Button as={Link} to="/admin/sellos/nuevo">
            Nuevo Sello
          </Button>
          <Button as={Link} to="/admin/sellos/123-4567">
            Prueba Sello
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default AdminSeals;
