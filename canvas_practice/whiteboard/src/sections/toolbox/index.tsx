import { createRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowPointer, faCode, faRuler, faSquare as faSolidSquare, faTableCells } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.scss'
import * as Types from '@/types/sections/toolbox'


export default function Toolbox(props: Types.Props) {


    return <div className={styles['toolbox-area']}>
        <div className={styles['toolbox']}>
            <div
                className={styles[`tool${props.currentTool === 'box-draw' ? ' active' : ''}`]}
                onClick={() => props.onToolChange('box-draw')}
            >
                <FontAwesomeIcon icon={faSquare} />
            </div>
        </div>
    </div >
}
