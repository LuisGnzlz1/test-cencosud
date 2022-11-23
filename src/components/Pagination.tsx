import React, { useEffect } from "react";

const Pagination = ({ range, setPage, page, slice }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);
    return (
        <nav className={''}>
            <ul className="pagination">
            {range.map((el, index) => (
                <li
                    key={index}
                    className={`${'page-item'} ${
                        page === el ? 'active' : ''
                    }`}
                    onClick={() => setPage(el)}
                >
                    <span className="page-link">{el}</span>
                </li>
            ))}
            </ul>
        </nav>
    );
};

export default Pagination;