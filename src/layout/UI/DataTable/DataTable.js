import React from 'react';
import styled from 'styled-components';

const DataTable = ({children, columns}) => (
    <StyledTable>
        <thead>
            <tr>
                {columns.map(col => (
                    <th key={col} style={{widths: 'auto', float: 'top'}}>
                        {col.replace(/_/g, ' ')}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </StyledTable>
);

export default DataTable;

const StyledTable = styled.table`
    margin-bottom: 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;

    thead {
        tr {
            th {
                padding: .5rem;
                text-align: left;
                border-bottom: 2px solid lightgrey;
                background-color: #600080;
                color: white;
            }
        }
    }

    tbody {
        tr {
            border-top: 1px solid black;

            &:nth-child(even) {
                background: #e6e6ff;
            }

            td {
                padding: 0.25rem .5rem;
                font-size: 0.85rem;
            }
        }
    }
`