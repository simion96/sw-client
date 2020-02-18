import * as actions from '../../store/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../layout/UI/DataTable/DataTable';
import ExpandButton from '../../layout/UI/Button/ExpandButton';
import {Link} from 'react-router-dom';
import { isBoolean } from 'util';

const TableView = (props) => {
    const {resourceType, favouritesActive} = props;
    const dispatch = useDispatch();
    const headers = useSelector(state => state[resourceType+'_headers']);
    const data = useSelector(state => {
        if (!favouritesActive) {
            return state[resourceType];
        } else {
            return state[resourceType].filter(item => item.isFavourite);
        }
    });

    useEffect(() => {
        dispatch(actions.getResource(resourceType));
    }, []);

    const renderText = (item, url) => {
        if (item && typeof item === 'string' && item.startsWith('http')) { //search for links
            const endpoint = item.split('/');
            const typeFromLink = endpoint[4];
            const indexFromLink = endpoint[5];
            const link = typeFromLink + '/' + indexFromLink;
            return (<Link to={link}>{link}</Link>)
        }  else if (isBoolean(item)) {
            const endpoint = url.split('/');
            const typeFromLink = endpoint[4];
            return favButton(item, typeFromLink, url);
        }
        else {
            return item;
        }

    }

    const favButton = (isFav, resType, url) => {
        if (isFav) {
            return (
                <button
                    onClick={() => dispatch(actions.setFavouriteResource(resType, url))}>
                    <img src={require('../../assets/img/heart-outline-24-filled.png')}></img>
                </button>
            )
        } else {
            return (
                <button
                    onClick={() => dispatch(actions.setFavouriteResource(resType, url))}>
                    <img src={require('../../assets/img/heart-outline-24.png')}></img>
                </button>
            )
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

                                    {Array.isArray(resource[item]) && resource[item].length > 0 ? 
                                        <ExpandButton text={resource[item]}>Expand</ExpandButton> :
                                        renderText(resource[item], resource.url)
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