import styles from '../styles/index.module.css'
import Canvas from '../sections/canvas'
import Toolbox from '../sections/toolbox'
import { useState } from 'react'

export default function Index() {
    const [currentTool, setCurrentTool] = useState('select')

    return (
        <div id={styles.app} >
            <Toolbox currentTool={currentTool} />

            <Canvas /></div>
    )
}
