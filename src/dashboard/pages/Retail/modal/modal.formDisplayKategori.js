import React, { useContext, useEffect, useState} from "react";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Select from "react-select";
import { Method } from "../../../../service";
import * as Services from "../../../../service";
import { Form } from 'react-bootstrap';

const api = Services.api.ApiRetail.toko;

const ModalFormDisplayKategori = (props) => {
  const { selected_company } = useContext(Services.Context);
  const { show, onHide, onSubmit } = props;
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [name, setName] = useState("");

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
        category_display_name: name,
        category_item_id: categorySelected.value,
        company_id: selected_company.value
      }

      await Method.post(`category_display`, data_post)
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
        category_display_name: name,
        category_item_id: show.category_item_id,
        company_id: selected_company.value
      }

      await Method.put(`category_display/${show.category_display_id}`, data_post)
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
    setName("");
  }
  
  useEffect(() => {
    if(show) {
      if(show==='add'){
        clearForm();
      }else{
        setName(show.category_display_name)
      }
    }
  }, [show])

  return (
    <Component.Modal_Component
      size="lg"
      title={'Edit Display Kategori'}
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
            <Style.Label color={Style.COLOR_SECONDARY}>Kategori</Style.Label>
            <Select
              placeholder="Pilih Kategori"
              options={category}
              onChange={(e) => {
                setCategorySelected(e);
              }}
              onInputChange={(e) => {
                setTimeout( async () => {
                  await Method.get(`category_item?category_item_name=${e}&limit=*`)
                    .then(async (res) => {
                      if (res?.data?.success) {
                        setCategory(
                          res?.data?.data?.map((item) => ({
                            value: item.category_item_id,
                            label: item.category_item_name
                          }))
                        )
                      }
                    })
                }, 1000)
              }}
              value={categorySelected}
            />
          </div>
        }
        
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Nama</Style.Label>
          <Form.Control 
            placeholder="Nama"
            value={name}
            onChange={(e)=>setName(e.target.value)} 
          />
        </div>
      </div>
    </Component.Modal_Component>
  );
};

export default ModalFormDisplayKategori;