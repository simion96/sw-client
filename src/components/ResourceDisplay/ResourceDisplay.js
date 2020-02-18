import React from 'react';
import {useSelector} from 'react-redux';
import classes from './ResourceDisplay.module.css';
import {Link} from 'react-router-dom';
import { isBoolean } from 'util';


const createStringDisplays = (val) => (
    Object.keys(val).map(item => (
        <div key={item}>
            { Array.isArray(val[item]) && val[item].length > 0 ?
                null :
                <div key={item} className={classes.Row}>
                    {item.replace(/_/g, ' ')}:
                    <span style={{float: "right"}}>
                        {renderText(val[item])}
                    </span>
                </div>
            }
        </div>
    ))
)

const createArrayDisplays = (val) => (
    Object.keys(val).map(item => (
        <div key={item + 1}>
            { Array.isArray(val[item]) && val[item].length > 0 ?
                <div className={classes.Column}>
                    <div className={classes.Row}>
                        <strong>{item}</strong>
                    </div>
                    {val[item].map(el => (
                        <div key={el} className={classes.Row}>
                            {renderText(el)}
                        </div>
                    ))}
                </div>
                : undefined
            }
        </div>
    ))
)

//reusable function - reuse
const renderText = (item) => {
    if (item && typeof item === 'string' && item.startsWith('http')) {
        const endpoint = item.split('/');
        const link = '/' + endpoint[4] + '/' + endpoint[5];
        return (<Link to={link}>{link}</Link>)
    } else if (isBoolean(item)){
        if (item) return '✔️'
        else return '❌';
    } else {
        return item;
    }
}

const ResourceDisplay = (props) => {
    const resourceUrl = props.location.pathname;
    const resourceType = resourceUrl.split('/')[1];
    const currentResource = useSelector(state => state[resourceType].filter(res => res.url.endsWith(resourceUrl+'/'))[0]);

    return (
        <div id="container" className={classes.Container}>
            {currentResource && (
            <div id="wrapper" style={{ position: 'relative', width: '100%'}}>
                <h2 style={{textAlign: 'center'}}>{`${resourceType}: ${currentResource.name}`}</h2>
                <div className={classes.DisplayWrapper}>
                    <div id="column" className={classes.Column}>
                        {createStringDisplays(currentResource)}
                    </div>
                </div>

                <div className={classes.MultiColumnWrapper}>
                    {createArrayDisplays(currentResource)}
                </div>
            </div>
            )}

            {!currentResource && (
                <h2>No data available</h2>
            )}
        </div>
    );
}

export default ResourceDisplay;