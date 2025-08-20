import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../../components/admin/admin-header";
import { Link } from "react-router";

function AdminEvents() {
  return (
    <>
      <Card className="p-2">
        <AdminHeader crumbs={[{ title: "Eventos" }]} />
        <Divider />
        <CardBody className="flex flex-col gap-2">
          Events Content
          <Button as={Link} to="/admin/eventos/nuevo">
            Nuevo Evento
          </Button>
          <Button as={Link} to="/admin/eventos/123-4567">
            Prueba Evento
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default AdminEvents;
