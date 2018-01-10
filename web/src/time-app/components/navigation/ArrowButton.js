import React from 'react'

import './ArrowButton.css'

export const ArrowButton = ({ direction, onClick }) => (
    <button className={`aui-button arrow-button arrow-button--${direction}`} onClick={onClick}>
        <span className={`aui-icon aui-icon-small aui-iconfont-devtools-arrow-${direction}`}>View</span>
    </button>
)
