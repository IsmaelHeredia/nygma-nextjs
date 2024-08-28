"use client";

import React, { useState, useEffect } from "react";
import LayoutAdmin from "@/components/LayoutAdmin";

import { useParams } from "next/navigation";

import SaveDocument from "@/components/SaveDocument";

const EditarDocumento = () => {

    const params = useParams();

    const id = Number(params.id);

    return (
        <LayoutAdmin>
            <SaveDocument document_id={id} />
        </LayoutAdmin>
    );

}

export default EditarDocumento;