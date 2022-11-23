import React, { useState } from "react";
import Pagination from "./Pagination";
import useTable from "../hooks/useTable";

const Table = ({ data }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, 10);
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Edad</th>
                        <th>Nacionalidad</th>
                        <th>Fecha</th>
                    </tr>
                    </thead>
                <tbody>
                {slice.map((p) => (
                    <tr key={p.id}>
                        <td>{p.nombres}</td>
                        <td>{p.apellidos}</td>
                        <td>{p.edad}</td>
                        <td>{p.nacionalidad}</td>
                        <td>{p.fecha}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default Table;