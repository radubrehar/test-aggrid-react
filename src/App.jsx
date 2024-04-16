import { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const genColumns = [
  ...Array.from({ length: 100 }, (_, i) => ({
    field: `col-${i}`,
  })),
];

const columns = [
  { field: "id" },
  { field: "make" },
  { field: "model" },
  { field: "price" },

  // generate 100 more columns
  ...genColumns,
];

function addColPropsToObject(obj) {
  return genColumns.reduce((acc, col, i) => {
    acc[`col-${i}`] = `${col.field} - ${obj.id}`;
    return acc;
  }, obj);
}

const rowData = [
  addColPropsToObject({
    make: "Tesla",
    model: "Model Y",
    price: 64950,
    electric: true,
    id: "x",
  }),
  addColPropsToObject({
    make: "Ford",
    model: "F-Series",
    price: 33850,
    electric: false,
    id: "y",
  }),
  addColPropsToObject({
    make: "Toyota",
    model: "Corolla",
    price: 29600,
    electric: false,
    id: "z",
  }),
  // generate another 1000 rows
  ...Array.from({ length: 1000 }, (_, i) =>
    addColPropsToObject({
      make: `Make ${i}`,
      model: `Model ${i}`,
      id: `id-${i}`,
      price: Math.floor(Math.random() * 100000),
      electric: Math.random() > 0.5,
    })
  ),
];

const getRowId = (data) => data.id;

function getColumns() {
  const cols = [...columns];
  const count = localStorage.getItem("columnCount") * 1 || 4;
  cols.length = count;
  return cols;
}

const GridExample = () => {
  const [colDefs, setColDefs] = useState(getColumns);

  const setColumnCount = (value) => {
    localStorage.setItem("columnCount", value);
    setColDefs(getColumns());
  };

  return (
    <div>
      Grid height: <b>500px</b>. Row height: <b>18px</b>. Row count{" "}
      <b>{rowData.length}</b>. Column count{" "}
      <select
        value={localStorage.getItem("columnCount") || 4}
        onChange={(event) => {
          setColumnCount(event.target.value);
        }}
      >
        <option value="4">4</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: "500px", width: "100vw" }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          getRowId={getRowId}
          rowData={rowData}
          columnDefs={colDefs}
          rowHeight={18}
          rowBuffer={0}
          ensureDomOrder={false}
        />
      </div>
    </div>
  );
};

export default GridExample;
