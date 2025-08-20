import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../../components/admin/admin-header";
import { Link } from "react-router";

function AdminSponsors() {
  return (
    <>
      <Card className="p-2">
        <AdminHeader crumbs={[{ title: "Patrocinadores" }]} />
        <Divider />
        <CardBody className="flex flex-col gap-2">
          Sponsors Content
          <Button as={Link} to="/admin/patrocinadores/nuevo">
            Nuevo Patrocinador
          </Button>
          <Button as={Link} to="/admin/patrocinadores/123-4567">
            Prueba Patrocinador
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default AdminSponsors;
