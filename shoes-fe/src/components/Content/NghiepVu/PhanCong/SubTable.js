import MaterialReactTable from "material-react-table";

const SubTable = ({ row_each_page, columns, data }) => {
  return (
    <div>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns}
        data={data}
        // components
        enableColumnResizing
        initialState={{ pagination: { pageSize: row_each_page, pageIndex: 0 } }}
        enablePinning
        // enableEditing
        // onEditingRowSave={handleSaveRowEdits}
        // onEditingRowCancel={handleCancelRowEdits}
      />
    </div>
  );
};

export default SubTable;
