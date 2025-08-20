import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../../components/admin/admin-header";
import { useLoaderData } from "react-router";

function AdminSponsorsEdit() {
  const { sponsor = {} } = useLoaderData();

  return (
    <>
      <Card className="p-2">
        <AdminHeader
          crumbs={[
            { title: "Patrocinadores", link: "/admin/patrocinadores" },
            { title: sponsor?.uuid ?? "Nuevo Patrocinador" },
          ]}
        />
        <Divider />
        <CardBody>Sponsors Edit Content {sponsor?.displayName}</CardBody>
      </Card>
    </>
  );
}

export default AdminSponsorsEdit;
