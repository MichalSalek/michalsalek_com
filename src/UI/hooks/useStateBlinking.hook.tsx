import { freezeThreadAndWait }                             from '@msalek/utils'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'




type UseStateBlinkingHook = {
    booleanSwitch: boolean,
    setBooleanSwitch: Dispatch<SetStateAction<boolean>>,
    doBlinkingAnimation: () => Promise<void>
}

export const useStateBlinking = (): UseStateBlinkingHook => {
    const [booleanSwitch, setBooleanSwitch] = useState(false)

    const doBlinkingAnimation = useCallback(async (): Promise<void> => {
        setBooleanSwitch(true)
        await freezeThreadAndWait(100)
        setBooleanSwitch(false)
        await freezeThreadAndWait(100)
        setBooleanSwitch(true)
        await freezeThreadAndWait(100)
        setBooleanSwitch(false)
        await freezeThreadAndWait(200)
        setBooleanSwitch(true)
        await freezeThreadAndWait(200)
        setBooleanSwitch(false)
    }, [setBooleanSwitch])

    return ({booleanSwitch, setBooleanSwitch, doBlinkingAnimation})
}
