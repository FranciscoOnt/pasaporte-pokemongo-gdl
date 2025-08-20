import { NavbarBrand } from "@heroui/react";
import { BsPassport } from "react-icons/bs";
import { NavLink } from "react-router";

function PageLogo() {
  return (
    <>
      <NavbarBrand>
        <NavLink to="/" className="flex flex-row items-center gap-2">
          <BsPassport size={32} />
          <div className="flex flex-col">
            <h1 className="font-bold text-inherit text-sm">Pasaporte</h1>
            <h2 className="text-inherit text-xs">Pokémon GO GDL</h2>
          </div>
        </NavLink>
      </NavbarBrand>
    </>
  );
}

export default PageLogo;
