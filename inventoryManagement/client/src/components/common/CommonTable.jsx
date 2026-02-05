const CommonTable = ({ list, columns }) => {
  return (
    <div>
      {" "}
      <table className="table table-striped">
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col">
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index + 1}>
              {columns?.map((column, colIndex) => (
                <td key={colIndex}>{column.selector(item, index)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
