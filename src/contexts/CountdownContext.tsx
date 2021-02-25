import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    isActive: boolean;
    hasFinished: boolean;
    minutes: number;
    seconds: number;
    startCoundown: () => void;
    resetCountdown: () => void;
}
interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCoundown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false);
    }

    // useEffect(() => {
    // O que vou executar
    // }, [Quando vou executar (neste caso quando o valor de active mudar e a cada mudança no valor de time)])
    useEffect(() => {
        // Se o countdown está ativo e ainda não chegou a zero:
        if (isActive && time > 0) {
            // quero que depois de 1000 milisegundos o time seja reduzido em 1s
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


    return (
        <CountdownContext.Provider 
            value={{
                isActive,
                hasFinished,
                minutes,
                seconds,
                startCoundown,
                resetCountdown
            }}>
            {children}
        </CountdownContext.Provider>
    )
}