import { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
function Offer({ onEdit, editItem, selectedItem }) {
  const [rec_date, setRec_date] = useState("");
  const [rec_dateerror, setRec_dateerror] = useState(false);
  const [client, setClient] = useState("");
  const [clienterror, setClienterror] = useState(false);
  const [project_name, setProject_name] = useState("");
  const [project_nameerror, setProject_nameerror] = useState(false);
  const [description, setDescription] = useState("");
  const [work_type, setWork_type] = useState("Fabrication");
  const [quo_no, setQuo_no] = useState("");
  const [quo_date, setQuo_date] = useState("");
  const [quo_values, setQuo_values] = useState("");
  const [status, setStatus] = useState("");
  const workScope = ["Fabrication", "Erection", "Fabrication & Erection"];

  useEffect(() => {
    if (selectedItem) {
      setRec_date(selectedItem.rec_date);
      setClient(selectedItem.client);
      setProject_name(selectedItem.project_name);
      setDescription(selectedItem.description);
      setWork_type(selectedItem.work_type);
      setQuo_no(selectedItem.quo_no);
      setQuo_date(selectedItem.quo_date);
      setQuo_values(selectedItem.quo_values);
      setStatus(selectedItem.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRecDateChange = (e) => {
    setRec_date(e);
    setRec_dateerror(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!rec_date) {
      setRec_dateerror(true);
      return;
    }
    if (!project_name) {
      setProject_nameerror(true);
      return;
    }
    if (!client) {
      setClienterror(true);
      return;
    }

    onEdit({
      rec_date,
      client,
      project_name,
      description,
      work_type,
      quo_no,
      quo_date,
      quo_values,
      status,
    });

    setRec_date("");
    setClient("");
    setProject_name("");
    setDescription("");
    setWork_type("");
    setQuo_no("");
    setQuo_date("");
    setQuo_values("");
    setStatus("");

    editItem(false);
  };

  const cancelEdit = () => {
    setRec_date("");
    setClient("");
    setProject_name("");
    setDescription("");
    setWork_type("");
    setQuo_no("");
    setQuo_date("");
    setQuo_values("");
    setStatus("");

    editItem(false);
    return;
  };
  return (
    <div className="container">
      <div className="row g-5 justify-content-center">
        <div className="col-md-9 col-lg-10">
          <h4 className="mb-3">Edit Request</h4>
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-sm-3">
                <label htmlFor="rec_date" className="form-label">
                  Request Date
                </label>
                <DatePicker
                  className="form-control"
                  onChange={onRecDateChange}
                  value={rec_date}
                />
                {rec_dateerror && (
                  <div className="alert alert-danger">
                    Request Date is required
                  </div>
                )}
              </div>

              <div className="col-sm-9">
                <label htmlFor="client" className="form-label">
                  Client
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="client"
                  value={client}
                  onChange={(e) => {
                    setClient(e.target.value);
                    e.target.value === ""
                      ? setClienterror(true)
                      : setClienterror(false);
                  }}
                  onBlur={(e) => {
                    e.target.value === ""
                      ? setClienterror(true)
                      : setClienterror(false);
                  }}
                  name="client"
                  placeholder="Client"
                />
                {clienterror && (
                  <div className="alert alert-danger">Client is required</div>
                )}
              </div>

              <div className="col-sm-12">
                <label htmlFor="project_name" className="form-label">
                  Project
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="project_name"
                  value={project_name}
                  onChange={(e) => {
                    setProject_name(e.target.value);
                    e.target.value === ""
                      ? setProject_nameerror(true)
                      : setProject_nameerror(false);
                  }}
                  onBlur={(e) => {
                    e.target.value === ""
                      ? setProject_nameerror(true)
                      : setProject_nameerror(false);
                  }}
                  name="project_name"
                />
                {project_nameerror && (
                  <div className="alert alert-danger">Project is required</div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Description
                  <span className="text-muted">(Optional)</span>
                </label>
                <textarea
                  className="form-control"
                  col="4"
                  id="description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>

              <div className="col-3">
                <label htmlFor="work_type" className="form-label">
                  Work Scope
                </label>
                <select
                  className="form-select"
                  id={workScope.filter((scop) => scop === work_type)}
                  required
                  name="work_type"
                  multiple={false}
                  onChange={(e) => setWork_type(e.target.value)}
                  defaultValue={workScope
                    .filter((scop) => scop === work_type)
                    .toString()}
                >
                  {workScope.map((scop, index) => (
                    <option key={index} value={scop}>
                      {scop}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-3">
                <label htmlFor="quo_no" className="form-label">
                  Offer No. <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quo_no"
                  name="quo_no"
                  value={quo_no}
                  onChange={(e) => setQuo_no(e.target.value)}
                />
              </div>
              <div className="col-3">
                <label htmlFor="quo_date" className="form-label">
                  Offer Date
                  <span className="text-muted">(Optional)</span>
                </label>
                <DatePicker
                  className="form-control"
                  onChange={setQuo_date}
                  value={quo_date}
                />
              </div>

              <div className="col-3">
                <label htmlFor="quo_values" className="form-label">
                  Offer Value
                  <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quo_values"
                  name="quo_values"
                  value={quo_values}
                  onChange={(e) => setQuo_values(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label htmlFor="status" className="form-label">
                  Offer Status
                  <span className="text-muted">(Optional)</span>
                </label>
                <textarea
                  className="form-control"
                  col="4"
                  id="status"
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                ></textarea>
              </div>

              <hr className="my-4" />
              <div className="col-12">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-secondary float-end"
                  type="button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Offer;
