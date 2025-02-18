import React, {useState} from 'react';
import Modal from '../Modal/Modal';
import classes from './ExpandButton.module.css';
import {Link} from 'react-router-dom';


const ExpandButton = (props) => {
	const [showModal, setShowModal] = useState(false);

    const cancelModalHandler = () => {
		setShowModal(false);
    }

    const openModalHandler = () => {
        setShowModal(true);
    }

    const transformText = (links) => {
        return links.map(link => {
            const endpoint = link.split('/');
            const localResource = '/' + endpoint[4] + '/' + endpoint[5];
            return (
                <Link to={localResource} key={localResource}>
                    <p>{localResource}</p>
                </Link>
            )
        })

    }

    return (
        <div>
            {showModal 
                ?  <Modal show={showModal} modalClosed={cancelModalHandler}>
                        {transformText(props.text)}
                    </Modal> 
                : null 
            }
            <button
                className={classes.Button}
                onClick={openModalHandler}>{props.children}</button>
        </div>
    )
};

export default ExpandButton;