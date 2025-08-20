import { Card, CardBody, Divider } from "@heroui/react";

import AdminHeader from "../../../components/admin/admin-header";
import { useLoaderData } from "react-router";

function AdminUsersInspect() {
  const { profile } = useLoaderData();
  const { displayName, uuid } = profile;

  return (
    <>
      <Card className="p-2">
        <AdminHeader
          crumbs={[
            { title: "Usuarios", link: "/admin/usuarios" },
            { title: displayName ?? uuid },
          ]}
        />
        <CardBody>{JSON.stringify(profile)}</CardBody>
      </Card>
    </>
  );
}

export default AdminUsersInspect;
