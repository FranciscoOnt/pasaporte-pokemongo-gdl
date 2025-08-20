import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../../components/admin/admin-header";
import { useLoaderData } from "react-router";

function AdminCollectionsEdit() {
  const { collection = {} } = useLoaderData();

  return (
    <>
      <Card className="p-2">
        <AdminHeader
          crumbs={[
            { title: "Colecciones", link: "/admin/colecciones" },
            { title: collection?.uuid ?? "Nueva Coleccion" },
          ]}
        />
        <Divider />
        <CardBody>Collections Edit Content {collection?.displayName}</CardBody>
      </Card>
    </>
  );
}

export default AdminCollectionsEdit;
