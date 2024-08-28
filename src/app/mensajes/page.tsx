"use client";

import React, { useState, useRef } from "react";

import LayoutAdmin from "@/components/LayoutAdmin";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { TextField, Button, Box, Tabs, Tab } from "@mui/material";

import BuildIcon from "@mui/icons-material/Build";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styled } from "@mui/material/styles";

const CryptoJS = require("crypto-js");

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
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

function Mensajes() {

    const [value, setValue] = React.useState(0);

    const [mostrarMensaje, setMostrarMensaje] = useState("");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {

        setValue(newValue);

        setKeyEncrypt("");
        setKeyDecrypt("");
        setMessageSecret("");
        setMostrarMensaje("");

        setImageEncrypt(false);
        setImageDecrypt(false);
    };

    const [imageEncrypt, setImageEncrypt] = useState(false);
    const [messageSecret, setMessageSecret] = useState("");
    const [keyEncrypt, setKeyEncrypt] = useState("");

    const [imageDecrypt, setImageDecrypt] = useState(false);
    const [keyDecrypt, setKeyDecrypt] = useState("");

    const onChangeMessageSecret = (event: any) => {
        setMessageSecret(event.target.value);
    };

    const onChangeKeyEncrypt = (event: any) => {
        setKeyEncrypt(event.target.value);
    };

    const onChangeKeyDecrypt = (event: any) => {
        setKeyDecrypt(event.target.value);
    };

    const canvasRefEncrypt: any = useRef(null);
    const canvasRefDecrypt: any = useRef(null);

    const image = new Image();

    const onChangeImage = (event: any) => {
        const reader = new FileReader();
        reader.onload = function (e: any) {
            image.src = e.target.result;
            image.onload = function () {
                const ctx = canvasRefEncrypt.current.getContext("2d");
                canvasRefEncrypt.current.width = image.width;
                canvasRefEncrypt.current.height = image.height;
                ctx.drawImage(image, 0, 0);
            };
        };
        reader.readAsDataURL(event.target.files[0]);
        setImageEncrypt(true);
    };

    const onChangeImageDecrypt = (event: any) => {
        const reader = new FileReader();
        reader.onload = function (e: any) {
            image.src = e.target.result;
            image.onload = function () {
                const ctx = canvasRefDecrypt.current.getContext("2d");
                canvasRefDecrypt.current.width = image.width;
                canvasRefDecrypt.current.height = image.height;
                ctx.drawImage(image, 0, 0);
            };
        };
        reader.readAsDataURL(event.target.files[0]);
        setImageDecrypt(true);
    };

    const handleClickEncrypt = () => {

        setMostrarMensaje("");

        if (messageSecret == "" || keyEncrypt == "" || imageEncrypt == false) {
            toast.warning("Complete los datos para continuar", { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
        } else {

            const messageEncrypt = CryptoJS.AES.encrypt(messageSecret, keyEncrypt).toString();

            const ctx = canvasRefEncrypt.current.getContext("2d");

            const contextData = ctx.getImageData(0, 0, canvasRefEncrypt.current.width, canvasRefEncrypt.current.height);

            const data = contextData.data;

            let encodeString = "";

            for (let i = 0; i < messageEncrypt.length; i++) {
                let charText = messageEncrypt.charCodeAt(i).toString(2).padStart(8, "0");
                encodeString += charText;
            }

            encodeString += "00000000";

            for (let i = 0; i < encodeString.length; i++) {
                data[i * 4] = (data[i * 4] & 0b11111110) | parseInt(encodeString[i]);
            }

            ctx.putImageData(contextData, 0, 0);

            const url = canvasRefEncrypt.current.toDataURL();
            const a = document.createElement("a");

            a.href = url;
            a.download = "imagen.jpg";
            a.click();

            URL.revokeObjectURL(url);
        }

    };

    const handleClickDecrypt = async () => {

        if (imageDecrypt == false || keyDecrypt == "") {
            toast.warning("Complete los datos para continuar", { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
        } else {

            const ctx = canvasRefDecrypt.current.getContext("2d");

            const imgData = ctx.getImageData(0, 0, canvasRefDecrypt.current.width, canvasRefDecrypt.current.height);

            const data = imgData.data;

            let encodeString = "";
            let decodedString = "";

            for (let i = 0; i < data.length; i += 4) {
                encodeString += (data[i] & 1).toString();
            }

            for (let i = 0; i < encodeString.length; i += 8) {
                let byte = encodeString.slice(i, i + 8);

                if (byte.length < 8) {
                    break;

                }
                let charCode = parseInt(byte, 2);

                if (charCode === 0) {
                    break
                };

                decodedString += String.fromCharCode(charCode);
            }

            const messageDecrypt = CryptoJS.AES.decrypt(decodedString, keyDecrypt).toString(CryptoJS.enc.Utf8);

            if (messageDecrypt == "") {
                toast.warning("La clave es incorrecta", { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
            } else {
                setMostrarMensaje(messageDecrypt);
            }
        }
    };

    return (
        <LayoutAdmin>
            <div className="contenedor">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Ocultar mensaje" {...a11yProps(0)} />
                        <Tab label="Recuperar mensaje" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Card style={{ paddingBottom: 10 }}>
                        <CardContent>
                            <div className="center-div" style={{ marginBottom: "20px" }}>
                                <div className="linea">
                                    {
                                        imageEncrypt ?
                                            <canvas className="imagen" ref={canvasRefEncrypt} />
                                            :
                                            <div>Seleccione una imagen</div>
                                    }
                                </div>
                                <div className="linea" style={{ marginLeft: "20px" }}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<UploadFileIcon />}
                                    >
                                        Subir
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={onChangeImage}
                                        />
                                    </Button>
                                </div>
                            </div>
                            <div className="center-div">
                                <TextField
                                    value={messageSecret}
                                    onChange={onChangeMessageSecret}
                                    label="Mensaje"
                                    required
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    sx={{ mb: 3 }}
                                />
                            </div>
                            <div className="center-div">
                                <TextField
                                    value={keyEncrypt}
                                    onChange={onChangeKeyEncrypt}
                                    label="Clave"
                                    required
                                    variant="outlined"
                                    color="primary"
                                    type="password"
                                    sx={{ mb: 3 }}
                                />
                            </div>
                        </CardContent>
                        <CardActions className="center-div">
                            <Button
                                startIcon={<BuildIcon />}
                                variant="contained"
                                color="primary"
                                onClick={() => handleClickEncrypt()}
                            >
                                Generar
                            </Button>
                        </CardActions>
                    </Card>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Card style={{ paddingBottom: 10 }}>
                        <CardContent>
                            <div className="center-div" style={{ marginBottom: "20px" }}>
                                <div className="linea">
                                    {
                                        imageDecrypt ?
                                            <canvas className="imagen" ref={canvasRefDecrypt} />
                                            :
                                            <div>Seleccione una imagen</div>
                                    }
                                </div>
                                <div className="linea" style={{ marginLeft: "20px" }}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<UploadFileIcon />}
                                    >
                                        Subir
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={onChangeImageDecrypt}
                                        />
                                    </Button>
                                </div>
                            </div>
                            <div className="center-div">
                                <TextField
                                    value={keyDecrypt}
                                    onChange={onChangeKeyDecrypt}
                                    label="Clave"
                                    required
                                    variant="outlined"
                                    color="primary"
                                    type="password"
                                    sx={{ mb: 3 }}
                                />
                            </div>
                            {(mostrarMensaje != "") &&
                                <div className="center-div">
                                    <TextField
                                        value={mostrarMensaje}
                                        label="Mensaje"
                                        required
                                        variant="outlined"
                                        color="primary"
                                        type="text"
                                        sx={{ mb: 3 }}
                                        disabled
                                    />
                                </div>
                            }
                        </CardContent>
                        <CardActions className="center-div">
                            <Button
                                startIcon={<SearchIcon />}
                                variant="contained"
                                color="primary"
                                onClick={() => handleClickDecrypt()}
                            >
                                Recuperar
                            </Button>
                        </CardActions>
                    </Card>
                </CustomTabPanel>
            </div>
        </LayoutAdmin>
    );
}

export default Mensajes;