import {
  Chip,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Badge,
} from "@heroui/react";
import { CgCalendar, CgTime } from "react-icons/cg";
import { VscLocation } from "react-icons/vsc";
import { TbRubberStamp } from "react-icons/tb";
import { PiHandHeart } from "react-icons/pi";

function BigEventCard({ event }) {
  const { active } = event;

  return (
    <Card shadow="sm">
      <CardBody className="grid grid-flow-row md:grid-flow-col grid-cols-1 md:grid-cols-3 md:flex-row md:gap-4">
        <Image
          className="relative object-cover w-full h-full"
          src="https://lh3.googleusercontent.com/vOI7qV5u7nD8sjzFANXSD1LxpXOSaHe7UiciXnhd41ROqPQICe33wR9wQpOOXpar8Zl0HOQytIvBbknuEOYBzlkmWUAcz9ppl4leKNOlt8d-=w1440-e365"
        />
        <div className="col-span-2 flex flex-col w-full gap-y-2 py-2">
          {active && (
            <Chip
              className="absolute top-2 left-2 z-10 bg-success text-white"
              variant="bordered"
              color="success"
            >
              Registro Disponible!
            </Chip>
          )}
          <h1 className="font-bold md:text-2xl line-clamp-2">
            Día de la Comunidad de junio de 2025: Jangmo-o
          </h1>
          <h2 className="font-semibold text-sm md:text-lg text-foreground-700 line-clamp-1">
            No olvides traer tapitas!
          </h2>
          <Divider />
          <div className="max-w-xl text-foreground-500 text-sm">
            <div className="flex flex-row md:gap-8 max-w-md mb-1">
              <div className="flex flex-row gap-2 mr-auto font-semibold">
                <VscLocation size={24} />
                Plaza de la Liberación
              </div>
            </div>
            <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 md:gap-2 max-w-xl ">
              <div className="flex flex-row gap-2 content-center">
                <CgCalendar size={24} />
                {active ? "Hoy!" : "Diciembre 31"}
              </div>
              <div className="flex flex-row gap-2 content-center">
                <CgTime size={24} />
                12:00 PM
              </div>
              <div className="flex flex-row gap-2 content-center">
                <TbRubberStamp size={24} />
                Disponible
              </div>
              <div className="flex flex-row gap-2 content-center">
                <PiHandHeart size={24} />
                Tapitas
              </div>
            </div>
          </div>
          <Button
            className={`relative mt-auto max-w-xl mx-auto ${active && "text-white font-bold"}`}
            variant={active ? "solid" : "bordered"}
            fullWidth
            color={active ? "success" : "primary"}
          >
            {active ? "Registrarse" : "Ver Detalles"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default BigEventCard;
