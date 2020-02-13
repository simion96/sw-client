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

    const transformText = (text) => {
        return text.map(link => (
            <Link to={link} key={link}>
                <p>{link}</p>
            </Link>
        ));
    }

    return (
        <div>
            <Modal show={showModal} modalClosed={cancelModalHandler}>
                    {transformText(props.text)}
            </Modal>
            <button
                className={classes.Button}
                onClick={openModalHandler}>{props.children}</button>
        </div>
    )
};

export default ExpandButton;