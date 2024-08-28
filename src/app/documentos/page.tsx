"use client";

import React, { useState, useEffect } from "react";

import LayoutAdmin from "@/components/LayoutAdmin";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { Document, FilterDocuments } from "@/types/app/documents";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { getDocumentsAction, deleteDocumentAction } from "@/store/reducers/documentsSlice";
import { changeFiltersDocument } from "@/store/reducers/filtersSlice";

import { RootState } from "@/types/redux/global";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import { useRouter, redirect } from "next/navigation";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});


function ListDocuments() {

  const router = useRouter();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const mode = useSelector((state: RootState) => state.themes.mode);

  const table_css = (mode == "light") ? "th-light" : "th-dark";

  const getDocuments = (data: any) => dispatch(getDocumentsAction(data));
  const deleteDocument = (data: any) => dispatch(deleteDocumentAction(data));

  const documents_selector = useSelector((state: RootState) => state.documents.documents);

  const documents: Document[] = documents_selector ? documents_selector : [];

  const isLoadingDocuments = useSelector((state: RootState) => state.documents.isLoadingDocuments);
  const isLoadingDeleteDocument = useSelector((state: RootState) => state.documents.isLoadingDeleteDocument);

  const filters: any = useSelector((state: RootState) => state.filters);

  const [disabled, setDisabled] = useState(false);

  const [paginationData, setPaginationData] = useState({
    total: 0,
    paginas: 0,
    actual: 0,
    anterior: 0,
    siguiente: 0
  });

  function loadDocuments(pagina: number) {

    getDocuments({ page: pagina, name: filters.document_name })
      .unwrap()
      .then((payload: any) => {

        const total = parseInt(payload.total);
        const paginas = parseInt(payload.last_page);
        const actual = parseInt(payload.current_page);
        const anterior = (actual - 1) > 0 ? (actual - 1) : 0;
        const siguiente = (actual + 1) < total ? (actual + 1) : total;

        setPaginationData({
          total: total,
          paginas: paginas,
          actual: actual,
          anterior: anterior,
          siguiente: siguiente
        });

      })
      .catch((error: any) => {
        console.log('rejected', error);
      });

  }

  const [open, setOpen] = useState(false);

  const handleClickAtrasTodo = () => {
    loadDocuments(1);
  };

  const handleClickAtras = () => {
    loadDocuments(paginationData.anterior);
  };

  const handleClickSiguiente = () => {
    loadDocuments(paginationData.siguiente);
  };

  const handleClickSiguienteTodo = () => {
    loadDocuments(paginationData.paginas);
  };

  const handleCloseConfirm = (event: any, reason: string) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setOpenConfirm(false);
  };

  const handleDeleteDocument = (id: number) => {
    setDisabled(false);
    let document_data = documents.find(n => n.id === id);
    let document_id = document_data ? document_data.id : 0;
    let document_name = document_data ? document_data.name : "";
    setConfirmDeleteDocumentId(document_id);
    setConfirmDeleteDocumentName(document_name);
    setOpenConfirm(true);
  };

  const [openConfirm, setOpenConfirm] = useState(false);

  const [confirmDeleteDocumentId, setConfirmDeleteDocumentId] = useState(0);
  const [confirmDeleteDocumentName, setConfirmDeleteDocumentName] = useState("");

  const handleConfirmDelete = () => {

    deleteDocument({ id: confirmDeleteDocumentId })
      .unwrap()
      .then((payload: any) => {

        const estado = payload.status;
        const mensaje = payload.message;

        if (estado == 1) {
          loadDocuments(1);
          setOpen(false);
          toast.success(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
        } else {
          toast.warning(mensaje, { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });
        }

      })
      .catch((error: any) => {
        console.log('rejected', error);
      });

    setOpenConfirm(false);
  };


  useEffect(() => {

    loadDocuments(1);

  }, [filters.document_name]);

  const handleClickFiltrar: SubmitHandler<FilterDocuments> = (data) => {

    dispatch(changeFiltersDocument({
      "name": data.findName,
    }));

  };

  const handleClickBorrarFiltro = () => {

    dispatch(changeFiltersDocument({
      "name": "",
    }));

    setValueFiltro("findName", "");

  };

  const { register: registerFiltro, handleSubmit: handleSubmitFiltro, control: controlFiltro, setValue: setValueFiltro } = useForm<FilterDocuments>({
    defaultValues: {
      findName: filters.document_name,
    }
  });

  return (
    <LayoutAdmin>

      <div className="botones-principales">
        <Grid container justifyContent="flex-start" sx={{ mt: 5 }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => router.replace("/documentos/nuevo")}
          >
            Gestionar documento
          </Button>
        </Grid>
      </div>

      <Divider style={{ width: "100%", marginTop: "35px", marginBottom: "30px" }} />

      <form onSubmit={handleSubmitFiltro(handleClickFiltrar)}>

        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>

          <TextField
            {...registerFiltro("findName", { required: false })}
            label="Ingrese nombre"
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 3, mr: 1, width: "20%" }}
          />

          <div style={{ marginBottom: "25px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              sx={{ ml: 1 }}
            >
              Filtrar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ClearIcon />}
              sx={{ ml: 1 }}
              onClick={handleClickBorrarFiltro}
            >
              Borrar
            </Button>
          </div>

        </Grid>

      </form>

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="center"
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown
      >
        <DialogTitle>
          <Typography variant="h4" component="div">Confirmación</Typography>
        </DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <Typography>¿ Desea borrar el documento {confirmDeleteDocumentName} ?</Typography>
        </DialogContent>
        <DialogActions className="center-div" style={{ marginBottom: "10px" }}>
          <LoadingButton
            startIcon={<DeleteIcon />}
            color="primary"
            variant="contained"
            disabled={disabled}
            loading={isLoadingDeleteDocument}
            loadingPosition="start"
            type="submit"
            onClick={handleConfirmDelete}
          >
            Borrar
          </LoadingButton>
          <Button
            startIcon={<CloseIcon />}
            color="primary"
            variant="contained"
            disabled={disabled}
            onClick={() => setOpenConfirm(false)}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {isLoadingDocuments ?
        <div className="center-div" style={{ marginTop: "30px" }}>
          <CircularProgress color="secondary" size="5rem" className="center-div" style={{ marginTop: "70px" }} />
        </div>
        :

        <>

          {documents.length == 0 ?

            <Typography variant="h5" className="center-div" style={{ marginTop: "30px" }}>No se encontraron documentos</Typography>

            :

            <>
              <div className="datos-tabla">

                <TableContainer style={{ maxHeight: "460px", overflowY: "auto" }} component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell className={table_css}>Nombre</TableCell>
                        <TableCell className={table_css} align="center">Opción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {documents.map((document: Document) => (
                        <TableRow
                          key={document.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell className={table_css} component="th" scope="row">
                            {document.name}
                          </TableCell>
                          <TableCell align="center">

                            <IconButton onClick={() => router.replace("/documentos/" + document.id)}>
                              <EditIcon />
                            </IconButton>

                            <IconButton onClick={() => handleDeleteDocument(document.id)}>
                              <DeleteIcon />
                            </IconButton>

                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="paginas-documentos" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Typography className="left-documentos" style={{ marginTop: "20px" }}>
                  Página {paginationData.actual} / {paginationData.paginas}
                </Typography>
                <div className="right-documentos">
                  <ButtonGroup variant="contained" aria-label="Basic button group">
                    <IconButton disabled={paginationData.actual == 1} onClick={handleClickAtrasTodo}>
                      <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                    <IconButton disabled={paginationData.actual == 1} onClick={handleClickAtras}>
                      <KeyboardArrowLeftIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                    <IconButton disabled={paginationData.actual == paginationData.paginas} onClick={handleClickSiguiente}>
                      <KeyboardArrowRightIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                    <IconButton disabled={paginationData.actual == paginationData.paginas} onClick={handleClickSiguienteTodo}>
                      <KeyboardDoubleArrowRightIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                  </ButtonGroup>
                </div>
              </div>
            </>
          }
        </>
      }

    </LayoutAdmin>
  );

}

export default ListDocuments;