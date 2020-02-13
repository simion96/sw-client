import React from 'react';

const DataTable = ({children, columns}) => (
    <table>
        <thead>
            <tr>
                {columns.map(col => (
                    <th key={col} style={{widths: 'auto', float: 'top'}}>
                        {col.replace('_', ' ')}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
);

export default DataTable;