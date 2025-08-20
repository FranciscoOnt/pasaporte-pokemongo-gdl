import { Card, CardBody } from "@heroui/react";

function Terms() {
  return (
    <Card className="">
      <CardBody className="w-full">
        <div className="flex flex-col w-full text-center gap-4">
          <h1 className="font-bold uppercase">
            Política de Privacidad y Condiciones del Servicio
          </h1>
          <h2 className="font-bold  uppercase">Política de Privacidad</h2>
        </div>
        <ol className="flex flex-col list-decimal mx-8 py-2 gap-4">
          <li>
            <span className="font-bold">Uso Limitado: </span>
            Los usuarios de esta aplicación aceptan que la API de Google y la
            información proporcionada por esta será utilizada exclusivamente
            para autenticar la identidad de los usuarios. No se accederá,
            almacenará ni utilizará ningún otro dato personal o información
            contenida en las cuentas de los usuarios.
          </li>
          <li>
            <span className="font-bold">Consentimiento del Usuario: </span>
            Al utilizar esta aplicación y autorizar el uso de su cuenta de
            Google, los usuarios otorgan su consentimiento para que la
            aplicación acceda a la información necesaria para verificar su
            identidad y permitir el acceso. Los usuarios comprenden que solo se
            utilizará la información mínima requerida para lograr este
            propósito, que son: identificador de OpenID Connect (OIDC).
          </li>
          <li>
            <span className="font-bold">Seguridad de los Datos: </span>
            Nos comprometemos a tomar las medidas de seguridad necesarias para
            proteger los datos de los usuarios. La información de autenticación
            se manejará con la mayor confidencialidad y no se compartirá con
            terceros, excepto en los casos en que sea necesario para cumplir con
            la ley.
          </li>
          <li>
            <span className="font-bold">No Uso Comercial: </span>
            Los datos obtenidos a través de la API de Google no serán utilizados
            para fines comerciales ni se compartirán con terceros con fines
            publicitarios o de marketing. De ser necesario, compartiremos tu
            nombre de entrenador que ingresas después de iniciar sesión y que no
            tiene relación con tu cuenta de Google.
          </li>
          <li>
            <span className="font-bold">Derechos del Usuario: </span>
            Los usuarios pueden revocar el acceso de esta aplicación en
            cualquier momento a través de la configuración de sus cuentas de
            Google.
          </li>
          <li>
            <span className="font-bold">Cambios en los Términos: </span>
            Nos reservamos el derecho de modificar estos términos y condiciones
            en cualquier momento. Los usuarios serán notificados de cualquier
            modificación significativa y deberán aceptar los términos
            actualizados para continuar utilizando la aplicación.
          </li>
          <li>
            <span className="font-bold">Responsabilidad Limitada: </span>
            No nos hacemos responsables de cualquier daño, pérdida o
            inconveniente que pueda surgir del uso de la API de Google o de esta
            aplicación.
          </li>
        </ol>
        <div className="flex flex-col w-full text-center gap-4">
          <h2 className="font-bold  uppercase">Condiciones del Servicio</h2>
        </div>
        <ol className="flex flex-col list-decimal mx-8 py-2 gap-4">
          <li>
            <span className="font-bold">Uso Aceptable: </span>
            Al utilizar esta aplicación, aceptas cumplir con estas Condiciones
            del Servicio. La aplicación se proporciona de manera gratuita y se
            espera que la uses de manera responsable y respetuosa.
          </li>
          <li>
            <span className="font-bold">Uso Personal: </span>
            Esta aplicación está destinada para un uso personal y no comercial.
            No debes utilizarla para promover, vender o distribuir productos o
            servicios sin el consentimiento previo y por escrito de{" "}
            <b>Pokémon GO GDL</b>.
          </li>
          <li>
            <span className="font-bold">Acceso y Autenticación: </span>
            La aplicación utiliza la API de Google para autenticar a los
            usuarios y permitirles acceder a la plataforma. Entiendes que solo
            se accederá a la información necesaria para verificar tu identidad y
            permitir el acceso.
          </li>
          <li>
            <span className="font-bold">Responsabilidad del Usuario: </span>
            Esta aplicación se proporciona "tal cual", sin garantías de ningún
            tipo. No nos hacemos responsables de ningún daño directo, indirecto,
            incidental, especial o consecuente que pueda surgir del uso de la
            aplicación.
          </li>
          <li>
            <span className="font-bold">Terminación del Acceso: </span>
            Nos reservamos el derecho de suspender o terminar tu acceso a la
            aplicación si consideramos que has violado estas Condiciones del
            Servicio o si tu conducta es perjudicial para otros usuarios o para
            nosotros.
          </li>
          <li>
            <span className="font-bold">Contacto: </span>
            Si tienes preguntas, comentarios o inquietudes sobre estas
            Condiciones del Servicio, puedes ponerte en contacto con nosotros en{" "}
            <b>TBD</b>.
          </li>
          <li>
            <span className="font-bold">Dinámicas: </span>
            Los sorteos realizados por Pokémon GO GDL y las comunidades
            asociadas son beneficios gratuitos y voluntarios de parte de la
            Organización hacia los participantes, de ninguna manera podemos
            obligarte a participar en ellos. En caso de resultar ganador de
            alguno de nuestros premios, debes estar atento al anuncio del número
            y/o nombre que se indique y solicitar tu regalo. Por la dificultad
            de algunos de los nombres de entrenador de los jugadores, puede
            ocurrir un error al nombrar a algún ganador, por lo que te pedimos
            tu máxima atención para preguntar o corregir si crees que eres el
            ganador pero tu nombre de entrenador ha sido mal pronunciado.
            Además, debes cumplir las presentes Condiciones del Servicio para
            obtener premios en cualquier actividad.
          </li>
        </ol>
      </CardBody>
    </Card>
  );
}

export default Terms;
