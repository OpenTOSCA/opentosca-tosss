import {IconButton, Snackbar, Tooltip} from '@mui/material'
import {Close} from '@mui/icons-material'
import React, {useState} from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

export default function Copy({value, children}: {value: any; children: React.ReactNode}) {
    const [open, setOpen] = useState<boolean>(false)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)

    return (
        <>
            <Snackbar
                autoHideDuration={1000}
                open={open}
                onClose={onClose}
                message="Copied"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                }
            />

            <CopyToClipboard text={value} onCopy={onOpen}>
                <Tooltip title="Copy">
                    <span>{children}</span>
                </Tooltip>
            </CopyToClipboard>
        </>
    )
}
