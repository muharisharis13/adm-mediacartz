import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {ButtonDanger,ButtonPrimary} from "../style/content/default";
import styled from "styled-components";
import {Helmet} from "react-helmet";






export const IdxContentBuilder = ({show, onHide}) => {

  const [srcSCript, setSrcScript] = useState(false);


  useEffect(()=>{
    if(show){
      setTimeout(()=>setSrcScript(true),1000)
    }
  },[show])

  return (
    <Modal fullscreen show={show} onHide={onHide}>
      <Modal.Body>
            <Helmet>
            {/* <link rel="stylesheet" href="/contentbuilder/assets/bootstrap/css/bootstrap.css" /> */}
            <link rel="stylesheet" href="/contentbuilder/assets/minimalist-blocks/content.css"/>
            <link rel="stylesheet" href="/contentbuilder/contentbuilder/contentbuilder.css" type="text/css" />
            <link rel="stylesheet" href="/contentbuilder/assets/email-blocks/foundation.css" rel="stylesheet" type="text/css" />

              
            </Helmet>
          <div className="container" id="container">
          </div>

          <div className="d-flex align-items-center justify-content-center mt-5">
            <ButtonPrimary>Simpan sebagai HTML</ButtonPrimary>&nbsp;&nbsp;&nbsp;&nbsp;
            <ButtonDanger onClick={()=>{
              onHide();
              var myobj = document.getElementById("_cbhtml");
            myobj.remove();
            const removeElements = (elms) => elms.forEach(el => el.remove());
            removeElements( document.querySelectorAll(".moveable-control-box") );
            }}>Batal</ButtonDanger>
          </div>

          {/* SCRIPT TAG */}
          <Helmet>
            <script type="text/javascript" src="/contentbuilder/assets/jquery.min.js" />
            <script type="text/javascript" src="/contentbuilder/contentbuilder/contentbuilder.js" />
            <script type="text/javascript" src="/contentbuilder/assets/minimalist-blocks/content-v4.js" />
          </Helmet>
          
            {
              srcSCript && 
              <Helmet>
                <script type="text/javascript" src="/contentbuilder/script.js" />
              </Helmet>

            }
      </Modal.Body>
    </Modal>
  )
}

