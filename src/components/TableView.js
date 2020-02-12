import * as actions from '../store/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../layout/DataTable';
import ExpandButton from '../layout/UI/Button/ExpandButton';

const TableView = (props) => {
    const {resourceType} = props;
    const dispatch = useDispatch();
    const data = useSelector(state => state[resourceType+'']);
    const headers = useSelector(state => state[resourceType+'_headers']);

    useEffect(() => {
        dispatch(actions.getResource(resourceType));
    }, []);

    const renderText = (item) => {
        if (item && typeof item === 'string' && item.startsWith('http')) {
            const endpoint = item.split('/');
            const link = endpoint[4] + '/' + endpoint[5]
            return (<a href={link}>{link}</a>)
        } else {
            return item;
        }
    }

    return (
        <div>
            {data && (
                <DataTable columns={headers}>
                    {data.map((resource, idx) => (
                        <tr key={resource.url}>
                            {Object.keys(resource).map((item, idx) => (
                                <td key={resource.url+ idx}>

                                    {Array.isArray(resource[item]) ? 
                                        <ExpandButton text={resource[item]}>Expand</ExpandButton> :
                                        renderText(resource[item])
                                    }

                                </td>
                            ))}
                        </tr>
                    ))}
                </DataTable>
            )}
        </div>
    )
}

export default TableView;