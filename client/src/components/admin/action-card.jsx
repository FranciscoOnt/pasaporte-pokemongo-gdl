import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Listbox,
  ListboxItem,
  ListboxSection,
  Spinner,
} from "@heroui/react";
import { Link } from "react-router";

function AdminActionCard({ title, icon, link = "/", children, loading }) {
  return (
    <Link
      className="flex flex-col sm:grow basis-[45%] lg:basis-[30%]"
      to={link}
    >
      <Card className="min-h-28" shadow="sm" isPressable>
        <CardHeader className="bg-foreground-200 gap-x-2 p-1 pl-4">
          <span className="text-foreground-500">{icon}</span>
          <span className="font-semibold">{title}</span>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-row overflow-hidden">
          {loading ? (
            <>
              <Spinner color="default" variant="wave" size="sm" />
              <span className="text-foreground-500 text-tiny">
                Cargando Estadisticas
              </span>
            </>
          ) : (
            children
          )}
        </CardBody>
        <CardFooter className="text-foreground-700 text-sm flex flex-row justify-end">
          <Button color="primary" variant="light">
            Presiona para editar
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default AdminActionCard;
