"use client";

import React, { useState, useEffect, useRef } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Document } from "@/types/app/documents";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { RootState } from "@/types/redux/global";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import { getDocumentAction, createDocumentAction, updateDocumentAction, generateDocumentAction } from "@/store/reducers/documentsSlice";

import { useRouter } from "next/navigation";

import encryptMessage from "@/libs/encrypt";

import ImportDocument from "@/components/ImportDocument";

import { setDocumentData } from "@/store/reducers/documentsSlice";

interface Props {
    document_id: number | null;
}

function SaveDocument(props: Props) {

    const { document_id } = props;

    const router = useRouter();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const getDocument = (data: any) => dispatch(getDocumentAction(data));
    const createDocument = (data: any) => dispatch(createDocumentAction(data));
    const updateDocument = (data: any) => dispatch(updateDocumentAction(data));
    const generateDocument = (data: any) => dispatch(generateDocumentAction(data));

    const isLoadingCreateDocument = useSelector((state: RootState) => state.documents.isLoadingCreateDocument);
    const isLoadingUpdateDocument = useSelector((state: RootState) => state.documents.isLoadingUpdateDocument);

    const documentContent = useSelector((state: RootState) => state.documents.content);
    const documentKey = useSelector((state: RootState) => state.documents.key);

    const [disabled, setDisabled] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const { register: registerDocumento, handleSubmit: handleSubmitDocumento, formState: { errors: errorsDocumento }, control: controlDocumento, setValue: setValueDocumento, clearErrors: cleanErrorsDocumento, getValues: getValueDocumento, reset: resetDocumento } = useForm<Document>({
        defaultValues: {
            name: "",
            content: "",
            key: ""
        }
    });

    useEffect(() => {

        dispatch(setDocumentData({
            name: "",
            content: "",
            password: ""
        }));

    }, []);

    useEffect(() => {

        async function loadData() {

            if (document_id && document_id > 0) {

                setDisabled(true);

                const response = await getDocument({ id: document_id });

                const data = response.payload.document;

                const nombre = data.name;
                const content = data.content;
                const key = data.key;

                setValueDocumento("name", nombre);
                setValueDocumento("content", content);
                setValueDocumento("key", key);

                setDisabled(false);
            }

        }

        loadData();

    }, [document_id]);

    useEffect(() => {

        if (documentContent) {
            setValueDocumento("content", documentContent);
            setValueDocumento("key", documentKey);
        } else {
            setValueDocumento("name", "");
            setValueDocumento("content", "");
            setValueDocumento("key", "");
        }

    }, [documentContent]);

    const handleClickGuardarDocumento: SubmitHandler<Document> = (data) => {

        if (document_id == null || Number(document_id) == 0) {

            const datosForm = {
                "name": data.name,
                "content": data.content,
                "key": data.key
            };

            createDocument(datosForm)
                .unwrap()
                .then((payload: any) => {

                    const estado = payload.status;
                    const mensaje = payload.message;

                    if (estado == 1) {
                        toast.success(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });

                        setDisabled(true);

                        setTimeout(() => {
                            router.replace("/documentos");
                        }, Number(process.env.NEXT_PUBLIC_TIMEOUT_REDIRECT));

                    } else {
                        toast.warning(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                    }

                })
                .catch((error: any) => {
                    console.log('rejected', error);
                    toast.error(String(process.env.NEXT_PUBLIC_VITE_ERROR_AXIOS), { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                });

        } else {

            const datosForm = {
                "id": document_id,
                "name": data.name,
                "content": data.content,
                "key": data.key
            };

            updateDocument(datosForm)
                .unwrap()
                .then((payload: any) => {

                    const estado = payload.status;
                    const mensaje = payload.message;

                    if (estado == 1) {
                        toast.success(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });

                        setDisabled(true);

                        setTimeout(() => {
                            router.replace("/documentos");
                        }, Number(process.env.NEXT_PUBLIC_TIMEOUT_REDIRECT));

                    } else {
                        toast.warning(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                    }

                })
                .catch((error: any) => {
                    console.log('rejected', error);
                    toast.error(String(process.env.NEXT_PUBLIC_VITE_ERROR_AXIOS), { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                });

        }

    };

    const downloadDocument = () => {

        const values = getValueDocumento();

        const name = values.name;
        const content = values.content;
        const key = values.key;

        if (name != "" && content != "" && key != "") {

            const datosForm = {
                "name": name,
                "content": content,
                "key": key
            };

            generateDocument(datosForm)
                .unwrap()
                .then((payload: any) => {

                    const estado = payload.status;
                    const mensaje = payload.message;

                    if (estado == 1) {

                        const nombre = payload.name;
                        const contenido = payload.content;
                        const iv = payload.iv;

                        const filename = "document.html";

                        const htmlContent = encryptMessage(nombre, contenido, iv);

                        const blob = new Blob([htmlContent], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");

                        a.href = url;
                        a.download = filename;
                        a.click();

                        URL.revokeObjectURL(url);

                        toast.success(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                    } else {
                        toast.warning(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                    }

                })
                .catch((error: any) => {
                    console.log('rejected', error);
                    toast.error(String(process.env.NEXT_PUBLIC_VITE_ERROR_AXIOS), { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                });

        } else {
            formRef.current?.requestSubmit();
        }

    };

    return (

        <div className="contenedor" style={{ marginBottom: "20px" }}>

            <Card style={{ paddingBottom: 20 }}>

                <form ref={formRef} onSubmit={handleSubmitDocumento(handleClickGuardarDocumento)} noValidate>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div" align="center">
                            Gestión de documento
                        </Typography>
                        <TextField
                            {...registerDocumento("name", { required: true })}
                            label="Nombre"
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mt: 3, mb: 3 }}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={!!errorsDocumento.name}
                        />
                        <TextField
                            {...registerDocumento("content", { required: true })}
                            label="Contenido"
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mt: 3, mb: 3 }}
                            fullWidth
                            multiline
                            rows={10}
                            InputLabelProps={{ shrink: true }}
                            error={!!errorsDocumento.content}
                        />
                        <TextField
                            {...registerDocumento("key", { required: true })}
                            label="Clave"
                            variant="outlined"
                            color="primary"
                            type="password"
                            sx={{ mt: 3, mb: 3 }}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={!!errorsDocumento.key}
                        />
                    </CardContent>
                    <CardActions sx={{ mt: 3 }} className="center-div">
                        <LoadingButton
                            startIcon={<SaveIcon />}
                            loading={isLoadingCreateDocument || isLoadingUpdateDocument}
                            loadingPosition="start"
                            variant="contained"
                            disabled={disabled}
                            color="primary"
                            type="submit"
                        >
                            Guardar
                        </LoadingButton>
                        <ImportDocument disabled={disabled} />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<FileDownloadIcon />}
                            disabled={disabled}
                            onClick={() => downloadDocument()}
                        >
                            Descargar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            disabled={disabled}
                            onClick={() => router.replace("/documentos")}
                        >
                            Volver
                        </Button>
                    </CardActions>
                </form>

            </Card>
        </div>
    );

}

export default SaveDocument;