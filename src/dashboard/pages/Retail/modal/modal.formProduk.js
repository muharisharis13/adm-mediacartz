import React, { useEffect, useState, useRef, useContext } from "react";
import * as Component from "../../../../component";
import * as Util from "../../../../util";
import styled from "styled-components";
import * as Style from "../../../../component/style/content/default";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Select from "react-select";
import { Method, Context } from "../../../../service";
import { Form } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Plus } from "@styled-icons/bootstrap";
import { Delete } from "@styled-icons/typicons";
import * as Services from "../../../../service";

const api = Services.api.ApiRetail.toko;

const ModalFormProduk = (props) => {
  const { selected_company } = useContext(Context);
  const { show, onHide, type, onSubmit, data, categoryDisplayName } = props;
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState(1);
  let resetImage = useRef();

  const BtnSubmit = () => {
    if(type==='add'){
      saveProcess();
    }else{
      editProcess();
    }
  }

  const saveProcess = async () => {
    setLoading(true);
    try {
      const data_post = {
        item_sku: sku,
        item_name: name,
        item_description: desc,
        item_image: image,
        item_regular_price: price,
        item_discount_price: discount,
        category_display_id: categorySelected.value,
        company_id: selected_company.value,
        item_active_status: status
      }

      await Method.post(`item`, data_post)
      .then(async (res) => {
        if (res?.data?.success) {
          Component.AlertSuccess({ title: "Success", text: res?.data?.success });
          onSubmit();
        } else {
          Component.AlertError({ title: "Error", text: res?.data?.error });
        }
      })
    } catch (err) {
      console.log('err', err)
      Component.AlertError({ title: "Error", text: err });
    } finally {
      setLoading(false);
    }
  }

  const editProcess = async () => {
    setLoading(true);
    try {
      const data_post = {
        item_sku: sku,
        item_name: name,
        item_description: desc,
        item_image: image,
        item_regular_price: price,
        item_discount_price: discount,
        category_display_id: categorySelected.value,
        company_id: selected_company.value,
        item_active_status: status
      }

      await Method.put(`item/${data.item_id}`, data_post)
      .then(async (res) => {
        if (res?.data?.success) {
          Component.AlertSuccess({ title: "Success", text: res?.data?.success });
          onSubmit();
        } else {
          Component.AlertError({ title: "Error", text: res?.data?.error });
        }
      })
    } catch (err) {
      console.log('err', err)
      Component.AlertError({ title: "Error", text: err });
    } finally {
      setLoading(false);
    }
  }

  const clearForm = () => {
    setCategorySelected("");
    setSku("");
    setName("");
    setImage([]);
    setDesc("");
    setPrice("");
    setDiscount("");
    setStatus(1);
  }

  const OnChangeInputImage = (e) => {
    api.postStorageServer(e.target.files[0]).then((res) => {
      console.log(res);
      if (res?.data) {
        resetImage.current.value = "";
        setImage([...image, res?.data?.url]);
      }
    });
  }

  const BtnDeleteImageArr = (item) => {
    let filter = image.filter((filter) => filter !== item);
    setImage(filter);
  }

  useEffect(() => {
    if(show) {
      clearForm();

      if(type==='edit'){
        setCategorySelected({value: data.category_display_id, label: categoryDisplayName})
        setName(data.item_name);
        setSku(data.item_sku);
        setImage(data.item_image);
        setTimeout(() => {
          setDesc(data.item_description);
        }, 500);
        setPrice(data.item_regular_price);
        setDiscount(data.item_discount_price);
        setStatus(data.item_active_status);
      }
    }
  }, [show, type])

  return (
    <Component.Modal_Component
      size="lg"
      title={type==="add"?"Tambah Produk":"Edit Produk"}
      btnSubmit
      btnName={loading ? <Component.LoadingIcon /> : "Simpan"}
      onClick={loading ? null : BtnSubmit}
      onHide={onHide}
      show={show}
    >
      <Container className="container">
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Display Kategori</Style.Label>
          <Select
            placeholder="Select Display Kategori"
            options={category}
            onChange={(e) =>
              setCategorySelected(e)
            }
            onInputChange={(e) => {
              setTimeout( async () => {
                //request category display
                await Method.get(`company/${selected_company.value}/category_display?category_display_name=${e}&category_display_active_status_name=active&limit=*`)
                  .then(async (res) => {
                    console.log('res category', res)
                    if (res?.data?.success) {
                      setCategory(
                        res?.data?.data?.map((item) => ({
                          value: item.category_display_id,
                          label: item.category_display_name,
                        }))
                      )
                    }
                  })
              }, 500)
            }}
            value={categorySelected}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>SKU</Style.Label>
          <Form.Control 
            placeholder="SKU" 
            value={sku}
            onChange={(e)=>setSku(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Nama Produk</Style.Label>
          <Form.Control 
            placeholder="Nama Produk" 
            value={name}
            onChange={(e)=>setName(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Gambar</Style.Label>
          <div className="list-gambar d-flex gap-3 flex-wrap">
            {image.length > 0
              ? image?.map((item, idx) => (
                  <div style={{ position: "relative" }}>
                    <div key={idx} className="image-gambar">
                      <img src={item} alt="" />
                    </div>
                    <div className="btn-delete">
                      <Delete
                        cursor="pointer"
                        width={30}
                        onClick={() => BtnDeleteImageArr(item)}
                      />
                    </div>
                  </div>
                ))
              : null}
            <input
              type="file"
              name=""
              id="gambar"
              className="d-none"
              ref={resetImage}
              onChange={(e) => OnChangeInputImage(e)}
            />
            <label
              htmlFor="gambar"
              className="image-gambar"
              style={{ cursor: "pointer" }}
            >
              <Plus width={100} />
            </label>
          </div>
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Deskripsi</Style.Label>
          <CKEditor
            editor={ ClassicEditor }
            data={desc}
            onChange={ ( event, editor ) => {
              const data = editor.getData();
              setDesc(data);
            }}
            onReady={(editor) => {
              editor.editing.view.change( writer => {
                writer.setStyle( 'height', '200px', editor.editing.view.document.getRoot() );
              });
            }}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Harga</Style.Label>
          <Form.Control 
            placeholder="Harga" 
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Harga Setelah Diskon</Style.Label>
          <Form.Control 
            placeholder="Harga Setelah Diskon" 
            type="number"
            value={discount}
            onChange={(e)=>setDiscount(e.target.value)} 
          />
        </div>

        <Style.Label color={Style.COLOR_SECONDARY}>Status</Style.Label>
        <div className="d-flex flex-row">
          <Form.Check 
            type="radio"
            value={1}
            label={`Aktif`}
            onChange={() => setStatus(1)}
            name="status"
            checked={status===1}
          />

          <Form.Check 
            type="radio"
            value={0}
            label={`Tidak Aktif`}
            className="ms-4"
            onChange={() => setStatus(0)}
            name="status"
            checked={status===0}
          />
        </div>
      </Container>
    </Component.Modal_Component>
  );
};

export default ModalFormProduk;

const Row = styled.div`
border:1px solid transparent;
border-bottom-color:#ccc;
padding:5px 5px;

&:last-child{
  border-bottom-color: transparent;
}
`

const Container = styled.div`
  .list-gambar {
    .btn-delete {
      position: absolute;
      top: -10px;
      right: -10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: red;
      background-color: #fff;
      border-radius: 50%;
    }
    .image-gambar {
      width: 150px;
      height: 150px;
      border-radius: 10px 10px 10px 10px;
      overflow: hidden;
      background-color: green;
      color: #fff;
      font-weight: 600;
      justify-content: center;
      align-items: center;
      display: flex;
      img {
        max-width: 150px;
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }
  .image-logo {
    img {
      width: 100%;
    }
    max-width: 150px;
    width: 100%;
    height: 150px;
    border-radius: 999px;
    overflow: hidden;
  }
`;

