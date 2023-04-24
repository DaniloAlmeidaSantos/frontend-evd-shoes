import React from 'react';
import "./BannerComponent.css";
import banner from '../../media/images/banner.jpg';

const Banner = () => {
    return (
        <div className="banner">
            <img src={banner} alt="Banner" />
        </div>
    );
}

export default Banner;