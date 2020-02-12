import React, {useState} from 'react';
import Modal from '../Modal/Modal';
import classes from './ExpandButton.module.css';


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
            <a href='/h'><p>{link}</p></a>
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