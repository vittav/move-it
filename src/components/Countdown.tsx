import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Adiciona um zero na frente caso a quantidade de minutes seja menor que 10
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCoundown() {
        setActive(true);
    }

    // useEffect(() => {
        // O que vou executar
    // }, [Quando vou executar (neste caso quando o valor de active mudar e a cada mudança no valor de time)])
    useEffect(() => {
        // Se o countdown está ativo e ainda não chegou a zero:
        if (active && time > 0) {
            // quero que depois de 1000 milisegundos o time seja reduzido em 1s
            setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        }
    }, [active, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCoundown}
            >
                Iniciar um ciclo
            </button>
        </div>
    )
}