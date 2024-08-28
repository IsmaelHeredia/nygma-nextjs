import * as React from "react";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UpdateAccount } from "@/types/app/account";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { RootState } from "@/types/redux/global";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import { updateAccountAction } from "@/store/reducers/accountSlice";
import { logOutAction } from "@/store/reducers/accountSlice";
import { clearDataAuth } from "@/store/reducers/authSlice";
import { clearDataDocuments } from "@/store/reducers/documentsSlice";
import { clearDataFilters } from "@/store/reducers/filtersSlice";
import { clearDataAccount } from "@/store/reducers/accountSlice";

import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
});

const Account = () => {

    const router = useRouter();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [open, setOpen] = useState(false);

    const usuario_actual = useSelector((state: RootState) => state.auth.username);

    const updateAccount = (data: any) => dispatch(updateAccountAction(data));

    const logOut = () => dispatch(logOutAction({}));

    const isLoadingUpdateAccount = useSelector((state: RootState) => state.account.isLoadingUpdateAccount);

    const [disabled, setDisabled] = useState(false);

    const handleClickOpen = () => {

        cleanErrorsCuenta();

        setOpen(true);

    };

    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const handleClickActualizarCuenta: SubmitHandler<UpdateAccount> = (data) => {

        const datosForm = {
            "username": data.username,
            "new_username": data.new_username,
            "password": data.password,
            "new_password": data.new_password
        };

        updateAccount(datosForm)
            .unwrap()
            .then(async (payload: any) => {

                const estado = payload.status;
                const mensaje = payload.message;

                if (estado == 1) {

                    setOpen(false);

                    toast.success(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });

                    await logOut();

                    dispatch(clearDataAuth());
                    dispatch(clearDataDocuments());
                    dispatch(clearDataFilters());
                    dispatch(clearDataAccount());

                    setDisabled(true);

                    setTimeout(() => {
                        router.replace("/");
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

    const { register: registerCuenta, handleSubmit: handleSubmitCuenta, formState: { errors: errorsCuenta }, control: controlCuenta, setValue: setValueCuenta, clearErrors: cleanErrorsCuenta } = useForm<UpdateAccount>({
        defaultValues: {
            username: usuario_actual,
            new_username: "",
            password: "",
            new_password: ""
        }
    });

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <Tooltip title="Cuenta">
                    <AccountCircleIcon />
                </Tooltip>
            </IconButton>
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
                    <Typography variant="h4" component="div">Actualizar datos de cuenta</Typography>
                </DialogTitle>
                <form onSubmit={handleSubmitCuenta(handleClickActualizarCuenta)} noValidate>
                    <DialogContent style={{ paddingTop: 10 }}>
                        <TextField
                            {...registerCuenta("username", { required: true })}
                            label="Usuario actual"
                            required
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3 }}
                            fullWidth
                            disabled
                        />
                        <TextField
                            {...registerCuenta("new_username", { required: true })}
                            label="Nuevo usuario"
                            required
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3 }}
                            fullWidth
                            error={!!errorsCuenta.new_username}
                        />
                        <TextField
                            {...registerCuenta("password", { required: true })}
                            label="Clave"
                            variant="outlined"
                            color="primary"
                            type="password"
                            fullWidth
                            sx={{ mb: 3 }}
                            error={!!errorsCuenta.password}
                        />
                        <TextField
                            {...registerCuenta("new_password", { required: true })}
                            label="Nueva clave"
                            variant="outlined"
                            color="primary"
                            type="password"
                            fullWidth
                            sx={{ mb: 3 }}
                            error={!!errorsCuenta.new_password}
                        />
                    </DialogContent>
                    <DialogActions className="center-div" style={{ marginBottom: "10px" }}>
                        <LoadingButton
                            startIcon={<SaveIcon />}
                            color="primary"
                            variant="contained"
                            disabled={disabled}
                            loading={isLoadingUpdateAccount}
                            loadingPosition="start"
                            type="submit"
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
                </form>
            </Dialog>
        </>
    );

};

export default Account;