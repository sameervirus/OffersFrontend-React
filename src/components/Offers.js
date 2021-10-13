import { useState, useMemo } from "react";
import Button from "./Button";
import Pagination from "../pagination/Pagination";
let PageSize = 10;
function Offers({ items, editItem, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return items.slice(firstPageIndex, lastPageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const onClickAdd = () => {
    editItem(true);
  };

  const onClick = () => {};

  return (
    <div className="container">
      <div>
        <Button
          classtitle="btn-outline-success mt-2"
          title="Add Request"
          onClick={onClickAdd}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Client</th>
            <th>Project</th>
            <th>Scope of Work</th>
            <th>Service Type</th>
            <th>Quotation Date</th>
            <th>Quotation No#</th>
            <th>Quotation Value</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData &&
            currentTableData.map((o) => (
              <tr key={o.id}>
                <td>{o.rec_date}</td>
                <td>{o.client}</td>
                <td>{o.project_name}</td>
                <td>{o.description}</td>
                <td>{o.work_type}</td>
                <td>{o.quo_date}</td>
                {o.quo_no.length > 0 && <td>{o.quo_no}</td>}
                {o.quo_no.length === 0 && (
                  <td>
                    <Button
                      classtitle="btn-outline-warning btn-sm"
                      title="Generate"
                      onClick={onClick}
                    />
                  </td>
                )}
                <td>{o.quo_values}</td>
                <td>{o.status}</td>
                <td>
                  <Button
                    classtitle="btn-outline-info btn-sm"
                    title="fa-edit"
                    onClick={() => onEdit(o)}
                  />
                  <Button
                    classtitle="btn-outline-danger btn-sm"
                    title="fa-trash-alt"
                    onClick={onClick}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={items.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Offers;
