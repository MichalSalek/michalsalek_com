import { freezeThreadAndWait }                from '@msalek/utils'
import { Dispatch, SetStateAction, useState } from 'react'




type UseStateBlinkingHook = {
    booleanSwitch: boolean,
    setBooleanSwitch: Dispatch<SetStateAction<boolean>>,
    doBlinkingAnimation: () => Promise<void>
}

export const useStateBlinking = (): UseStateBlinkingHook => {
    const [booleanSwitch, setBooleanSwitch] = useState(false)

    const doBlinkingAnimation = async (): Promise<void> => {
        setBooleanSwitch(true)
        await freezeThreadAndWait(100)
        setBooleanSwitch(false)
        await freezeThreadAndWait(100)
        setBooleanSwitch(true)
        await freezeThreadAndWait(100)
        setBooleanSwitch(false)
        await freezeThreadAndWait(200)
        setBooleanSwitch(true)
        await freezeThreadAndWait(500)
        setBooleanSwitch(false)
    }

    return ({booleanSwitch, setBooleanSwitch, doBlinkingAnimation})
}
