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

const ModalFormMenu = (props) => {
  const { selected_company } = useContext(Context);
  const { show, onHide, onSubmit, storeId, data } = props;
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [itemSelected, setItemSelected] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState(0);

  const BtnSubmit = () => {
    if(show==='add'){
      saveProcess();
    }else{
      editProcess();
    }
  }

  const saveProcess = async () => {
    setLoading(true);
    try {
      const data_post = {
        menu_custom_price_status: 1,
        menu_regular_price: price,
        menu_discount_price: discount,
        item_id: itemSelected.value,
        store_id: storeId,
        menu_absolute_price_status: status
      }

      await Method.post(`menu`, data_post)
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
        menu_custom_price_status: 1,
        menu_regular_price: price,
        menu_discount_price: discount,
        item_id: itemSelected.value,
        store_id: storeId,
        menu_absolute_price_status: status
      }

      await Method.put(`menu/${data.menu_id}`, data_post)
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
    setItemSelected("");
    setPrice("");
    setDiscount("");
    setStatus(0);
  }

  
  useEffect(() => {
    if(show) {
      if(show==='edit'){
        setPrice(data.menu_regular_price);
        setDiscount(data.menu_discount_price);
        setStatus(data.menu_absolute_price_status);
        setItemSelected({
          value: data.item.item_id,
          label: data.item.item_name,
          sku: data.item.item_sku,
          category: data.item.category_display.category_display_name,
          image: data.item.item_image[0],
          price: data.item.item_regular_price,
          discount: data.item.item_discount_price
        })
      }else{
        clearForm();
      }
    }
  }, [show])

  console.log('data produk', data)

  useEffect(()=>{
    if(show==='add'){
      setPrice(itemSelected.price);
      setDiscount(itemSelected.discount);
    }
  }, [itemSelected])

  return (
    <Component.Modal_Component
      size="lg"
      title={show==="add"?"Tambah Menu":"Edit Menu"}
      btnSubmit
      btnName={loading ? <Component.LoadingIcon /> : "Simpan"}
      onClick={loading ? null : BtnSubmit}
      onHide={onHide}
      show={show}
    >
      <div className="container">
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Produk</Style.Label>
          <Select
            placeholder="Pilih Produk"
            options={item}
            onChange={(e) => {
              setItemSelected(e);
            }}
            onInputChange={(e) => {
              setTimeout( async () => {
                //request item
                await Method.get(`company/${selected_company.value}/item?item_name=${e}&limit=*`)
                  .then(async (res) => {
                    console.log('res item', res)
                    if (res?.data?.success) {
                      setItem(
                        res?.data?.data?.map((item) => ({
                          value: item.item_id,
                          label: item.item_name,
                          sku: item.item_sku,
                          category: item.category_display.category_display_name,
                          image: item.item_image[0],
                          price: item.item_regular_price,
                          discount: item.item_discount_price
                        }))
                      )
                    }
                  })
              }, 1000)
            }}
            value={itemSelected}
          />
        </div>
        {
          itemSelected!=="" &&
          <Box className="mb-3">
            <div className="d-flex flex-row align-items-center">
              <img src={itemSelected.image} style={{witdh:100, height:100, resizeMode:'cover'}}/>
              <div className="ms-4">
                <div>{itemSelected.category}</div>
                <div>{itemSelected.sku}</div>
                <b>{itemSelected.label}</b>
              </div>
            </div>
          </Box>
        }
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

        <Style.Label color={Style.COLOR_SECONDARY}>Harga Bisa Dipotong Voucher</Style.Label>
        <div className="d-flex flex-row">
          <Form.Check 
            type="radio"
            value={0}
            label={`Ya`}
            onChange={() => setStatus(0)}
            name="status"
            checked={status===0}
          />

          <Form.Check 
            type="radio"
            value={1}
            label={`Tidak`}
            className="ms-4"
            onChange={() => setStatus(1)}
            name="status"
            checked={status===1}
          />
        </div>
      </div>
    </Component.Modal_Component>
  );
};

export default ModalFormMenu;

const Box = styled.div`
  border-radius: 5px;
  background-color: #fff;
  padding:10px;
  border: 1px solid #ccc;
  img {
    border-radius: 5px;
  }
`