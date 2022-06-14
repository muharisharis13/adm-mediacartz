import React, { useState, useEffect } from "react";
import {
  Modal_Component,
  AlertSuccess,
  AlertError,
  LoadingIcon,
} from "../../../../component";
import {
  Label,
  COLOR_SECONDARY,
  COLOR_DANGER,
} from "../../../../component/style/content/default";
import { PlusSquareDotted } from "@styled-icons/bootstrap";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { TimesCircle } from "@styled-icons/fa-solid";
import { api_transaksi } from "../../../../service/api";

export const Modal_upload_bukti_bayar = ({
  show,
  onHide,
  transaction_id,
  getData,
}) => {
  const [file, setFile] = useState([]);
  const [image, setImage] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    onDrop: (acceptFiles) => {
      setFile(
        acceptFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const [loading, setLoading] = useState(false);

  const btnUpload = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("transaction_payment_file", file[0]);
    await api_transaksi
      .put_transaction_upload({
        transaction_id: transaction_id,
        body: formData,
      })
      .then(async (res) => {
        console.log({ put_transaction_upload: res });
        if (res.success) {
          await AlertSuccess({ title: "SUCCESS", text: res.success });
          await getData();
          await setFile([]);
          await onHide();
        } else if (res.error) {
          await AlertError({ title: "ERROR", text: res.error });
        }
        setLoading(false);
      })
      .catch(async (err) => {
        console.log({ err });
        await AlertError({ title: "ERROR", text: err.message });
        setLoading(false);
      });
  };

  const GetData1 = React.useCallback(async () => {
    setImage("");
    await api_transaksi
      .get_transaction_image({ transaction_id })
      .then((res) => {
        if (res.type === "image/jpeg" || res.type === "image/png") {
          let convert_blob = URL.createObjectURL(res);
          setImage(convert_blob);
        }
      });
  }, [transaction_id]);

  useEffect(() => {
    if (show) {
      GetData1();
    }
  }, [show, GetData1]);

  return (
    <Modal_Component
      show={show}
      onHide={onHide}
      title="Upload Bukti Pembayaran"
      btnSubmit={file.length === 0 ? false : true}
      btnName={loading ? <LoadingIcon /> : "Upload"}
      onClick={loading ? null : btnUpload}
    >
      <div className="container">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>File Bukti Pembayaran (Jpg/png)</Label>
        </div>
        <div
          className="mb-3 mb-md-3"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image !== "" && <Img src={image} alt="aaa" />}
        </div>
        <section>
          {file.length === 0 ? (
            <ContainerUpload {...getRootProps()} for="TF">
              <input
                type="file"
                id="TF"
                accept=".jpeg,.jpg,.png"
                className="form-control"
                {...getInputProps()}
              />
              <section>
                <PlusSquareDotted style={{ width: "100px" }} />
              </section>
              <section>Drag File Here</section>
            </ContainerUpload>
          ) : (
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img alt="preview" src={file[0].preview} />
              <IconCancel onClick={() => setFile([])} />
            </div>
          )}
        </section>
      </div>
    </Modal_Component>
  );
};

const ContainerUpload = styled.span`
  display: flex;
  width: 100%;
  max-width: 100%;
  border: 1px solid #ccc;
  color: #ccc;
  height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 7px;
`;

const Img = styled.img`
  object-fit: cover;
  max-width: 50%;
  width: 100%;
  height: 300px;
`;

const IconCancel = styled(TimesCircle)`
  width: 50px;
  position: absolute;
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
  cursor: pointer;
  color: #868b8e;
  transition: 450ms;

  &:hover {
    color: ${COLOR_DANGER};
  }
`;
