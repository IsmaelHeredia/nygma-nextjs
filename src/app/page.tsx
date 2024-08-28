"use client";

import React, { useState } from "react";

import LayoutLogin from "@/components/LayoutLogin";

import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import LoginIcon from "@mui/icons-material/Login";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ValidarIngreso } from "@/types/app/login";
import { useForm, SubmitHandler } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/redux/global";

import { ThunkDispatch } from "@reduxjs/toolkit";
import { loginUserAction, setAuth } from "@/store/reducers/authSlice";

import { clearDataDocuments } from "@/store/reducers/documentsSlice";
import { clearDataFilters } from "@/store/reducers/filtersSlice";
import { clearDataAccount } from "@/store/reducers/accountSlice";

import { useRouter } from "next/navigation";

const Ingreso = () => {

    const router = useRouter();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const loginUser = (data: any) => dispatch(loginUserAction(data));

    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    const [disabled, setDisabled] = useState(false);

    const handleClickIngreso: SubmitHandler<ValidarIngreso> = async (data) => {

        var datosForm = {
            "username": data.username,
            "password": data.password
        };

        loginUser(datosForm)
            .unwrap()
            .then((payload: any) => {

                const status = payload.status;

                if (status == "1") {

                    var token = payload.token;

                    dispatch(setAuth({
                        "token": token,
                        "username": data.username
                    }));

                    dispatch(clearDataDocuments());
                    dispatch(clearDataFilters());
                    dispatch(clearDataAccount());

                    toast.success("Bienvenido al sistema", { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });

                    setDisabled(true);

                    setTimeout(() => {
                        router.replace("/documentos");
                    }, Number(process.env.NEXT_PUBLIC_TIMEOUT_REDIRECT));

                } else {
                    toast.warning("Credenciales inválidas", { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
                }

            })
            .catch((error: any) => {
                console.log('rejected', error);
                toast.error(String(process.env.NEXT_PUBLIC_VITE_ERROR_AXIOS), { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
            });

    }

    const { register: registerIngreso, handleSubmit: handleSubmitIngreso, formState: { errors: errorsIngreso }, control: controlIngreso, setValue: setValueIngreso, clearErrors: cleanErrorsIngreso } = useForm<ValidarIngreso>({
        defaultValues: {
            username: "",
            password: "",
        }
    });

    return (
        <LayoutLogin>
            <div className="ingreso">
                <Card style={{ paddingBottom: 10 }}>
                    <form onSubmit={handleSubmitIngreso(handleClickIngreso)} noValidate>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" align="center" style={{ paddingBottom: 10 }}>
                                Iniciar sesión
                            </Typography>
                            <TextField
                                {...registerIngreso("username", { required: true })}
                                label="Usuario"
                                variant="outlined"
                                color="primary"
                                type="text"
                                sx={{ mb: 3 }}
                                fullWidth
                                error={!!errorsIngreso.username}
                            />
                            <TextField
                                {...registerIngreso("password", { required: true })}
                                label="Clave"
                                variant="outlined"
                                color="primary"
                                type="password"
                                fullWidth
                                sx={{ mb: 1 }}
                                error={!!errorsIngreso.password}
                            />
                        </CardContent>
                        <CardActions className="center-div">
                            <LoadingButton
                                startIcon={<LoginIcon />}
                                loading={isLoading}
                                loadingPosition="start"
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={disabled}
                            >
                                Ingresar
                            </LoadingButton>
                        </CardActions>
                    </form>
                </Card>
            </div>
        </LayoutLogin>
    );

};

export default Ingreso;