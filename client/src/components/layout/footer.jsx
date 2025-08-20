import { Card } from "@heroui/react";

function Footer() {
  return (
    <Card className="flex-wrap min-h-20 w-full content-center" radius="none">
      <div className="flex flex-col justify-center flex-wrap gap-4 h-full w-full md:max-w-4xl text-center p-4">
        <span className="font-light text-foreground-500">
          Pokémon GO GDL es posible gracias a sus organizadores, contribuyentes
          y patrocinadores, puedes apoyarlos visitando sus redes dando clic en
          sus respectivos logos.
        </span>
        <div></div>
        <span className="font-light text-foreground-500">
          2025 - Pokémon GO GDL
        </span>
      </div>
    </Card>
  );
}

export default Footer;
