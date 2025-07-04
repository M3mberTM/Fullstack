import { forwardRef, useImperativeHandle, useState } from 'react'
import {Button} from '@mui/material'

const Toggleable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant={"contained"} size={"small"} onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant={'contained'} size={'small'} onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable
