import * as React from "react";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import { setDocumentData, importDocumentAction } from "@/store/reducers/documentsSlice";

import { styled } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
});

interface Props {
    disabled: boolean;
}

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const ImportDocument = (props: Props) => {

    const { disabled } = props;

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [open, setOpen] = useState(false);

    const importDocument = (data: any) => dispatch(importDocumentAction(data));

    const [key, setKey] = useState("");

    const onChangeKey = (event: any) => {
        setKey(event.target.value);
    };

    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
        setKey("");
    };

    const handleClickImport = () => {

        const datosForm = {
            "htmlFile": selectedHtmlFile,
            "password": key
        };

        importDocument(datosForm)
            .unwrap()
            .then((payload: any) => {

                const estado = payload.status;
                const mensaje = payload.message;

                if (estado == 1) {

                    const name = "";
                    const content = payload.content;
                    const password = payload.password;

                    dispatch(setDocumentData({
                        name: name,
                        content: content,
                        key: password
                    }));

                    setOpen(false);
                    setKey("");

                    toast.success(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });

                } else {
                    toast.warning(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                }

            })
            .catch((error: any) => {
                console.log("rejected", error);
                toast.error(String(process.env.NEXT_PUBLIC_VITE_ERROR_AXIOS), { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
            });

    }

    const [selectedHtmlFile, setSelectedHtmlFile] = useState<null>(null);

    const handleImport = ({ target }: any) => {
        setSelectedHtmlFile(target.files[0]);
    };

    useEffect(() => {

        if (selectedHtmlFile) {
            setOpen(true);
        }

    }, [selectedHtmlFile]);

    return (
        <>

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<UploadFileIcon />}
                disabled={disabled}
            >
                Importar
                <VisuallyHiddenInput type="file" accept="text/html" onChange={handleImport} />
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                disableEscapeKeyDown
            >
                <DialogTitle>
                    <Typography variant="h4" component="div">Complete los datos</Typography>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 10 }}>
                    <TextField
                        value={key}
                        onChange={onChangeKey}
                        label="Clave"
                        required
                        variant="outlined"
                        color="primary"
                        type="password"
                        sx={{ mb: 3 }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className="center-div" style={{ marginBottom: "10px" }}>
                    <LoadingButton
                        startIcon={<SaveIcon />}
                        color="primary"
                        variant="contained"
                        disabled={disabled}
                        loading={false}
                        loadingPosition="start"
                        type="button"
                        onClick={() => handleClickImport()}
                    >
                        Guardar
                    </LoadingButton>
                    <Button
                        startIcon={<CloseIcon />}
                        color="primary"
                        variant="contained"
                        disabled={disabled}
                        onClick={() => setOpen(false)}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

};

export default ImportDocument;