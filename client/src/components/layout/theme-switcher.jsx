import { Button, NavbarItem } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { CgMoon, CgSun } from "react-icons/cg";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <NavbarItem justify="end">
        <Button
          variant="bordered"
          color="default"
          size="sm"
          radius="full"
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
          isIconOnly
        >
          {theme === "light" ? (
            <CgMoon size={16} color="white" />
          ) : (
            <CgSun size={16} color="white" />
          )}
        </Button>
      </NavbarItem>
    </>
  );
}

export default ThemeSwitcher;
