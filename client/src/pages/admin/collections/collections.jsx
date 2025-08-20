import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../../components/admin/admin-header";
import { Link } from "react-router";

function AdminCollections() {
  return (
    <>
      <Card className="p-2">
        <AdminHeader crumbs={[{ title: "Colecciones" }]} />
        <Divider />
        <CardBody className="flex flex-col gap-2">
          Collections Content
          <Button as={Link} to="/admin/colecciones/nuevo">
            Nueva Collecion
          </Button>
          <Button as={Link} to="/admin/colecciones/123-4567">
            Prueba Collecion
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default AdminCollections;
