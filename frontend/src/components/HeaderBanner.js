import Logo from '../assets/logo'
import React, { Component } from 'react';

const HeaderBanner = () => {
    return (<header>
        <div className='stripes'>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
        </div>
        <section id='intro'>
            <Logo className='logo'/>
        </section>
    </header>);
}

export default HeaderBanner
