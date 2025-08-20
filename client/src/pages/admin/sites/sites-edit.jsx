import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { IoMdHome } from "react-icons/io";
import AdminHeader from "../../../components/admin/admin-header";
import { useLoaderData } from "react-router";
import MapPicker from "../../../components/map/map-picker";

function AdminSitesEdit() {
  const { site = {} } = useLoaderData();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log(data);
  };

  return (
    <>
      <Card className="p-2">
        <AdminHeader
          crumbs={[
            { title: "Lugares", link: "/admin/lugares" },
            { title: site?.uuid ?? "Nuevo Lugar" },
          ]}
        />
        <Divider />
        <CardBody>
          <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
            <input hidden readOnly name="uuid" value={site ? site.uuid : ""} />
            <Input
              name="siteName"
              size="md"
              maxLength={100}
              isRequired
              label="Nombre del Lugar"
            />
            <MapPicker />
            <Button color="primary" type="submit">
              Guardar
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default AdminSitesEdit;
