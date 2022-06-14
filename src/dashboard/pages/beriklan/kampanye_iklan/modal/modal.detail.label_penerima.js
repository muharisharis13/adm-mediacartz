import React from 'react'
import { Modal_Component } from '../../../../../component';
import PropTypes from "prop-types"


export const Modal_detail_label_penerima = (props) => {
  return (
    <Modal_Component title="Detail Iklan" show={props.show} onHide={props.onHide} >Modal_detail_label_penerima</Modal_Component>
  )
}


Modal_detail_label_penerima.propTypes ={
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}
