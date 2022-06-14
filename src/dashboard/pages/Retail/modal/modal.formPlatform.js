import React, { useEffect, useState} from "react";
import * as Component from "../../../../component";
import styled from "styled-components";
import * as Style from "../../../../component/style/content/default";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Select from "react-select";
import { Method } from "../../../../service";
import * as Services from "../../../../service";
import { Form } from 'react-bootstrap';

const api = Services.api.ApiRetail.toko;

const ModalFormPLatform = (props) => {
  const { show, onHide, onSubmit, menuId, data } = props;
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState([]);
  const [platformSelected, setPlatformSelected] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [link, setLink] = useState("");

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
        menu_platform_regular_price: price,
        menu_platform_discount_price: discount,
        menu_platform_link: link,
        ms_merchant_payment_id: platformSelected.value
      }

      await Method.post(`menu/${menuId}/menu_platform`, data_post)
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
        menu_platform_regular_price: price,
        menu_platform_discount_price: discount,
        menu_platform_link: link,
        ms_merchant_payment_id: data.ms_merchant_payment.ms_merchant_payment_id
      }

      await Method.put(`menu/${menuId}/menu_platform/${data.menu_platform_id}`, data_post)
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
    setPlatformSelected("");
    setPrice("");
    setDiscount("");
    setLink("");
  }
  
  useEffect(() => {
    if(show) {
      if(show==='edit'){
        setPrice(data.menu_platform_regular_price);
        setDiscount(data.menu_platform_discount_price);
        setLink(data.menu_platform_link)
      }else{
        clearForm();
      }
    }
  }, [show, data])

  return (
    <Component.Modal_Component
      size="lg"
      title={show==="add"?"Tambah Platform":"Edit Platform "+data?.ms_merchant_payment?.ms_merchant_payment_name}
      btnSubmit
      btnName={loading ? <Component.LoadingIcon /> : "Simpan"}
      onClick={loading ? null : BtnSubmit}
      onHide={onHide}
      show={show}
    >
      <div className="container">
        {
          show==='add' &&
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>Platform</Style.Label>
            <Select
              placeholder="Pilih Platform"
              options={platform}
              onChange={(e) => {
                setPlatformSelected(e);
              }}
              onInputChange={(e) => {
                setTimeout( async () => {
                  await Method.get(`list/ms_merchant_payment?ms_merchant_payment_name=${e}&limit=*`)
                    .then(async (res) => {
                      if (res?.data?.success) {
                        setPlatform(
                          res?.data?.data?.map((item) => ({
                            value: item.ms_merchant_payment_id,
                            label: item.ms_merchant_payment_name
                          }))
                        )
                      }
                    })
                }, 1000)
              }}
              value={platformSelected}
            />
          </div>
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
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Link</Style.Label>
          <Form.Control 
            placeholder="Contoh: https://example.com" 
            value={link}
            onChange={(e)=>setLink(e.target.value)} 
          />
        </div>
      </div>
    </Component.Modal_Component>
  );
};

export default ModalFormPLatform;

const Box = styled.div`
  border-radius: 5px;
  background-color: #fff;
  padding:10px;
  border: 1px solid #ccc;
  img {
    border-radius: 5px;
  }
`