import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import AdminHeader from "../../../components/admin/admin-header";
import { useLoaderData } from "react-router";

function AdminSealsEdit() {
  const { seal = {} } = useLoaderData();

  return (
    <>
      <Card className="p-2">
        <AdminHeader
          crumbs={[
            { title: "Sellos", link: "/admin/sellos" },
            { title: seal?.uuid ?? "Nuevo Sello" },
          ]}
        />
        <Divider />
        <CardBody>Seals Edit Content {seal?.displayName}</CardBody>
      </Card>
    </>
  );
}

export default AdminSealsEdit;
