import { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

function PriceCellRenderer(params) {
  // console.log(params);
  return (
    <div style={{ width: params.rowIndex % 100 }}>
      <span>
        <input defaultValue={params.value}></input>!!!
      </span>
    </div>
  );
}

const getRowId = (data) => data.id;
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true, id: "x" },
    { make: "Ford", model: "F-Series", price: 33850, electric: false, id: "y" },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      id: "z",
    },
    // generate another 1000 rows
    ...Array.from({ length: 1000 }, (_, i) => ({
      make: `Make ${i}`,
      model: `Model ${i}`,
      id: `id-${i}`,
      price: Math.floor(Math.random() * 100000),
      electric: Math.random() > 0.5,
    })),
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "make" },
    { field: "model" },
    // { field: "price", cellRenderer: PriceCellRenderer },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    // wrapping container with theme & size
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
  );
};

export default GridExample;
