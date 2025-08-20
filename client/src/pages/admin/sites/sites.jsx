import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Divider,
} from "@heroui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LuMapPinPlus } from "react-icons/lu";
import AdminHeader from "../../../components/admin/admin-header";
import { Link } from "react-router";

function AdminSites() {
  const [sites, setSites] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    return [...sites].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, sites]);

  const pages = Math.ceil(sortedItems.length / rowsPerPage) || 1;

  const finalItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col sm:flex-row w-full p-4 justify-between items-center gap-2 gap-y-4">
        <Link to="/admin/lugares/nuevo">
          <Button color="primary">
            <LuMapPinPlus />
            <span>Agregar Lugar</span>
          </Button>
        </Link>
        <label className="flex items-center text-small gap-2">
          Resultados por Página:
          <select
            className="bg-transparent outline-none text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
    );
  }, [onRowsPerPageChange]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {sites.length} lugares
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [sites.length, page, pages, onPreviousPage, onNextPage]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();

      setSites(res);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Card className="p-2">
        <AdminHeader crumbs={[{ title: "Lugares" }]} />
        <Divider />
        <CardBody>
          <Table
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            shadow="none"
            isStriped
            aria-label="users-table"
          >
            <TableHeader>
              <TableColumn width={"30%"} key="displayName" allowsSorting>
                Nombre
              </TableColumn>
              <TableColumn width={"15%"} key="location">
                Ubicación
              </TableColumn>
              <TableColumn width={"5%"} key="radius">
                Radio
              </TableColumn>
              <TableColumn width={"10%"} key="createdAt" allowsSorting>
                Fecha de Creación
              </TableColumn>
            </TableHeader>
            <TableBody
              items={finalItems}
              emptyContent={"No hay informacion para mostrar."}
            >
              {(item) => (
                <TableRow key={item.uuid}>
                  {(columnKey) => (
                    <TableCell>
                      <RenderUserCell user={item} columnKey={columnKey} />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default AdminSites;
