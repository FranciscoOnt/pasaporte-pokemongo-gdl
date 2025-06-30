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

import AdminHeader from "../../components/admin/admin-header";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUsers, userFill } from "../../lib/api";
import { RenderUserCell } from "../../components/admin/users/user-row";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "name",
        direction: "ascending",
    });
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.displayName?.toLowerCase().includes(filterValue.toLowerCase()) ||
                (user.uuid.substring(0, 8)).includes(filterValue.toLowerCase()),
            );
        }

        return filteredUsers;
    }, [users, filterValue, hasSearchFilter]);

    const sortedItems = useMemo(() => {
        console.log(sortDescriptor)
        return [...filteredItems].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, filteredItems]);

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

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = useMemo(() => {
        return (<div className="flex flex-col sm:flex-row w-full p-4 justify-between items-center gap-2">
            <Input
                isClearable
                className="w-full sm:max-w-1/2"
                placeholder="Buscar por Nombre..."
                startContent={<></>}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
            />
            <Button onPress={async () => await userFill()} >Add 100 Dummy</Button>
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

        </div>)
    }, [filterValue, onRowsPerPageChange, onSearchChange, onClear]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="text-default-400 text-small">Total {users.length} usuarios</span>
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
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Anterior
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Siguiente
                    </Button>
                </div>
            </div>
        );
    }, [users.length, page, pages, onPreviousPage, onNextPage]);



    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers()

            console.log(res)
            setUsers(res)
        }

        fetchUsers();
    }, [])

    return (
        <>
            <Card className='p-2'>
                <AdminHeader current={'Usuarios'} />
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
                            <TableColumn width={'30%'} key='displayName' allowsSorting>Nombre</TableColumn>
                            <TableColumn width={'15%'} key='collection'>Sellos</TableColumn>
                            <TableColumn width={'5%'} key='actions'>Acciones</TableColumn>
                            <TableColumn width={'10%'} key='lastLogin' allowsSorting>Último Acceso</TableColumn>
                            <TableColumn width={'10%'} key='nameUpdateDate' allowsSorting>Cambio de Nombre</TableColumn>
                            <TableColumn width={'10%'} key='teamUpdateDate' allowsSorting>Cambio de Equipo</TableColumn>
                            <TableColumn width={'10%'} key='createdAt' allowsSorting>Fecha de Registro</TableColumn>
                        </TableHeader>
                        <TableBody items={finalItems} emptyContent={"No hay informacion para mostrar."}>
                            {(item) => (
                                <TableRow key={item.uuid}>
                                    {(columnKey) => <TableCell><RenderUserCell user={item} columnKey={columnKey} /></TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </>
    )
}

export default AdminUsers
