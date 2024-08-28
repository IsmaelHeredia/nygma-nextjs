"use client";

import React, { useState, useEffect } from "react";
import LayoutAdmin from "@/components/LayoutAdmin";

import "react-toastify/dist/ReactToastify.css";

import SaveDocument from "@/components/SaveDocument";

function NuevoDocumento() {

  return (
    <LayoutAdmin>
      <SaveDocument document_id={null} />
    </LayoutAdmin>
  );

}

export default NuevoDocumento;