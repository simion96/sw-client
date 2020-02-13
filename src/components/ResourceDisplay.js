import React from 'react';
import {useSelector} from 'react-redux';
import classes from './ResourceDisplay.module.css';
import {Link} from 'react-router-dom';

const dummyUser = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.co/api/planets/1/',
    films: [
      'https://swapi.co/api/films/2/',
      'https://swapi.co/api/films/6/',
      'https://swapi.co/api/films/3/',
      'https://swapi.co/api/films/1/',
      'https://swapi.co/api/films/7/'
    ],
    species: [
      'https://swapi.co/api/species/1/'
    ],
    vehicles: [
      'https://swapi.co/api/vehicles/14/',
      'https://swapi.co/api/vehicles/30/'
    ],
    starships: [
      'https://swapi.co/api/starships/12/',
      'https://swapi.co/api/starships/22/'
    ],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.co/api/people/1/'
  }

const ResourceDisplay = (props) => {
    const resourceUrl = props.location.pathname;
    const resourceType = resourceUrl.split('/')[1];
    const store = useSelector(state => state[resourceType]);
    //const redData = store.filter(res => res.url.endsWith(resourceUrl+'/'));
    const currentResource = dummyUser;

    //reusable function - reuse
    const renderText = (item) => {
        if (item && typeof item === 'string' && item.startsWith('http')) {
            const endpoint = item.split('/');
            const link = '/' + endpoint[4] + '/' + endpoint[5]
            return (<Link to={link}>{link}</Link>)
        } else {
            return item;
        }
    }

    const createStringDisplays = (val) => (
        Object.keys(val).map(item => (
            <div key={item}>
                { Array.isArray(val[item]) && val[item].length > 0 ?
                    undefined:
                    <div className={classes.Row}>
                        {item.replace('_', ' ')}:
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
                            {item}
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

    return (
        <div id="container" className={classes.Container}>
            {currentResource && (
            <div id="wrapper" style={{position: 'relative', width: '100%'}}>

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
        </div>
        
    );
}

export default ResourceDisplay;