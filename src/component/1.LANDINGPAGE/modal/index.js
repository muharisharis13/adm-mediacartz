import React, {lazy, Suspense} from "react";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types"


export const IdxModalLanding = (props) =>{
  return(
    <Modal show={props.show} onHide={props.onHide} size={props.size}>
      {
        props.header &&
        <Modal.Header>
          header
        </Modal.Header>
      }
      <Modal.Body>
        {/* <Suspense> */}
          {props.children}
        {/* </Suspense> */}
      </Modal.Body>
      {
        props.footer &&
        <Modal.Footer>
          footer
        </Modal.Footer>
      }
    </Modal>
  )
}


IdxModalLanding.defaultProps = {

}

IdxModalLanding.propTypes ={
show : PropTypes.bool,
onHide : PropTypes.func,
children: PropTypes.any,
footer: PropTypes.bool,
header : PropTypes.bool,
size : PropTypes.string
}