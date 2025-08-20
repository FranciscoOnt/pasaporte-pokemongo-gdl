import { Button, CardBody, CardHeader } from "@heroui/react";
import { CgGoogle } from "react-icons/cg";
import { API_URL } from "../../lib/constants";
import { TbRubberStamp } from "react-icons/tb";
import { BsPassport } from "react-icons/bs";
import { VscLocation } from "react-icons/vsc";
import { TbPokeball } from "react-icons/tb";

function GuestLanding() {
  return (
    <>
      <CardBody className="w-full">
        <h1 className="text-2xl text-center">
          Mi Pasaporte
          <br />
          Pokémon Go GDL
        </h1>
        <div className="flex w-full max-w-64 justify-between mx-auto my-8">
          <BsPassport size={48} />
          <VscLocation size={48} />
          <TbRubberStamp size={48} />
          <TbPokeball
            className="hover:stroke-purple-500 hover:animate-wiggle transition-all duration-500 "
            size={48}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 mb-6 ">
          <p>
            Registrate para poder participar en las actividades presenciales que
            realiza la comunidad y coleccionar sellos digitales por tu
            asistencia.
          </p>
          <p>
            Si ya estas regristrado, inicia sesión para poder ver los eventos
            activos y tu coleccion de sellos digitales.
          </p>
          <ul className="list-disc ml-6 py-2">
            <li>Es necesaria una cuenta de Google para poder registrarse.</li>
            <li>
              No es necesario que la cuenta que utilices este vinculada a
              Pokémon GO.
            </li>
          </ul>
        </div>
        <a className="w-fit mx-auto mb-6" href={`${API_URL}/login`}>
          <Button
            radius="full"
            size="lg"
            variant="solid"
            color="primary"
            startContent={<CgGoogle size={24} />}
          >
            Acceder con Google
          </Button>
        </a>
        <div className="max-w-4xl mx-auto px-4 mb-6 text-center">
          <p>
            Al iniciar sesión con tu cuenta de Google confirmas que has leído y
            aceptas nuestra
          </p>
          <p>Política de Privacidad y Condiciones del Servicio</p>
        </div>
      </CardBody>
    </>
  );
}

export default GuestLanding;
