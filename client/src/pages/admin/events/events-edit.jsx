import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../../components/admin/admin-header";
import { useLoaderData } from "react-router";

function AdminEventsEdit() {
  const { event = {} } = useLoaderData();

  return (
    <>
      <Card className="p-2">
        <AdminHeader
          crumbs={[
            { title: "Eventos", link: "/admin/eventos" },
            { title: event?.uuid ?? "Nuevo Evento" },
          ]}
        />
        <Divider />
        <CardBody>Event Edit Content {event?.displayName}</CardBody>
      </Card>
    </>
  );
}

export default AdminEventsEdit;
