import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './star.json';
import classes from './Loading.module.css';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
}


const Loading = (props) => {
    const isLoading = props.loading;
    return( 
        <div className={classes.Loading}>
            <Lottie options={defaultOptions} 
                    height={200} 
                    width={200} 
                    isPaused={isLoading}/>
        </div>
    );
}

export default Loading;
