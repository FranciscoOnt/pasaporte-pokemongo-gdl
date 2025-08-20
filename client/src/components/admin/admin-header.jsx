import { CardHeader } from "@heroui/react";
import { Link } from "react-router";
import { IoMdHome, IoIosArrowForward } from "react-icons/io";
import { Fragment } from "react";

function AdminHeader({ crumbs = [] }) {
  return (
    <>
      <CardHeader className="flex flex-row content-center flex-wrap gap-2">
        {crumbs.length > 0 ? (
          <Link className="cursor-pointer flex flex-row gap-1" to="/admin">
            <IoMdHome size={24} className="fill-foreground-500" />
            <h1 className="text-sm font-semibold hidden sm:flex md:text-xl">
              Administración
            </h1>
          </Link>
        ) : (
          <>
            <IoMdHome size={24} className="fill-foreground-500" />
            <h1 className="text-sm md:text-xl">Administración</h1>
          </>
        )}
        <IoIosArrowForward
          size={16}
          className="fill-foreground-500 last:hidden"
        />
        {crumbs.map((crumb, index) => (
          <Fragment key={`crumb-${index}-${crumb.title}`}>
            {crumb.link ? (
              <Link
                className="cursor-pointer flex flex-row gap-1"
                to={crumb.link}
              >
                <h1 className="text-sm font-semibold md:text-xl">
                  {crumb.title}
                </h1>
              </Link>
            ) : (
              <h1 className="text-sm md:text-xl">{crumb.title}</h1>
            )}
            <IoIosArrowForward
              size={16}
              className="fill-foreground-500 last:hidden"
            />
          </Fragment>
        ))}
      </CardHeader>
    </>
  );
}

export default AdminHeader;
