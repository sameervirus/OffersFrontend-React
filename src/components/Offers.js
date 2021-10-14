import { useMemo } from "react";
import Button from "./Button";
import Pagination from "../pagination/Pagination";
let PageSize = 10;

function Offers({
  items,
  editItem,
  onEdit,
  addCurrentPage,
  currentPage,
  onDelete,
  getQuoNo,
}) {
  const currentTableData = useMemo(() => {
    console.log(items);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, items]);

  const onClickAdd = () => {
    editItem(true);
  };

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
                <td>
                  {(o.quo_no !== null || o.quo_no !== "") && <>{o.quo_no}</>}
                  {(o.quo_no === null || o.quo_no === "") && (
                    <>
                      <Button
                        classtitle="btn-outline-warning btn-sm"
                        title="Generate"
                        onClick={() => getQuoNo(o.id)}
                      />
                    </>
                  )}
                </td>
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
                    onClick={() => onDelete(o.id)}
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
        onPageChange={(page) => addCurrentPage(page)}
      />
    </div>
  );
}

export default Offers;
