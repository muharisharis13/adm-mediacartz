import React, { useContext, useEffect, useState} from "react";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Select from "react-select";
import { Method } from "../../../../service";
import * as Services from "../../../../service";
import { Form, Tabs, Tab } from 'react-bootstrap';
import { Card } from "../../../../component/1.LANDINGPAGE";
import styled from "styled-components";
import moment from "moment";
import Alert from "sweetalert2";
import Datepicker from "react-datepicker";

const api = Services.api.ApiRetail.toko;

const ModalFormRequest = (props) => {
  const { selected_company } = useContext(Services.Context);
  const { show, onHide, onSubmit, data } = props;
  const [loading, setLoading] = useState(false);
  const [typeRequest, setTypeRequest] = useState(0);
  const [storeTo, setStoreTo] = useState([]);
  const [storeToSelected, setStoreToSelected] = useState("");
  const [storeFrom, setStoreFrom] = useState([]);
  const [storeFromSelected, setStoreFromSelected] = useState("");
  const [itemSelected, setItemSelected] = useState([]);
  const [note, setNote] = useState("");
  const [modalProduk, setModalProduk] = useState(false);
  const [loadingProduk, setLoadingProduk] = useState(true);
  const [produkData, setProdukData] = useState([]);
  const [key, setKey] = useState("home");
  const [stockToStore, setStockToStore] = useState(null);
  const [stockFromStore, setStockFromStore] = useState(null);
  const [production, setProduction] = useState([]);
  const [productionSelected, setProductionSelected] = useState("");
  const [date, setDate] = useState("");

  const BtnSubmit = () => {
    if(show==='add'){
      saveProcess();
    }else{
      editProcess();
    }
  }

  const saveProcess = async () => {
    if(itemSelected.length===0){
      Component.AlertError({ title: 'Error', text: 'Produk belum dipilih' })
      return false;
    }

    setLoading(true);
    var success = [];
    var fail = [];

    for(var i=0; i<itemSelected.length; i++){
      const data_post = {
        stock_date: moment(date).format('YYYY-MM-DD'),
        item_id: itemSelected[i].data.item_id,
        stock_quantity: itemSelected[i].quantity,
        stock_note: note,
        stock_from_store_id: storeFromSelected===""?null:storeFromSelected.value,
        stock_to_store_id: storeToSelected.value,
        company_id: selected_company.value,
        production_id: typeRequest===0?(productionSelected===""?null:productionSelected.value):null
      }

      console.log('data_post', data_post);

      await Method.post('stock', data_post)
      .then((response) => {
        console.log('stock', response);
        if (response.data.success) {
          success.push(true)
        } else {
          fail.push(true)
        }
      })
      .catch((error) => {
        console.log('error stock', error.request)
        fail.push(true)
      });

      if(itemSelected.length-1===i){
        Alert.fire({
          title: "Buat Request Selesai",
          text: "Berhasil: "+success.length+", Gagal: "+fail.length,
          confirmButtonColor: Style.COLOR_PRIMARY,
        }).then((result) => {
          if(result.isConfirmed){
            onSubmit();
          }
        })
        setLoading(false);
      }
    }
  }

  const editProcess = async () => {
    setLoading(true);
    const data_post = {
      stock_date: moment(date).format('YYYY-MM-DD'),
      item_id: itemSelected[0].data.item_id,
      stock_quantity: itemSelected[0].quantity,
      stock_note: note,
      stock_from_store_id: storeFromSelected===""?null:storeFromSelected.value,
      stock_to_store_id: storeToSelected.value,
      company_id: selected_company.value,
      production_id: typeRequest===0?(productionSelected===""?null:productionSelected.value):null
    }

    await Method
    .put('stock/'+data.stock_id, data_post)
    .then((response) => {
      if (response.data.success) {
        Component.AlertSuccess({ title: "Success", text: response.data.success });
        onSubmit();
      } else {
        Component.AlertError({title: 'Error', text: response.data.error})
      }
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      Component.AlertError({title: 'Error', text: 'Terjadi kesalahan, silahkan coba lagi!'})
      console.log('Response error ', error);
    });
  }

  const clearForm = () => {
    setStoreToSelected("");
  }
  
  useEffect(() => {
    if(show) {
      if(show==='add'){
        clearForm();
      }else{
        
      }
    }
  }, [show])

  useEffect(() => {
    setStoreFromSelected("");
    setStoreToSelected("");
    setStockFromStore(null);
    setStockToStore(null);
    setProductionSelected("");
    setDate("");
    if(typeRequest===2){
      setNote('waste')
    }else{
      setNote('')
    }
  }, [typeRequest])

  useEffect(()=>{
    if(show==='add'){
      setStoreFromSelected("");
      setStoreToSelected("");
      setStockFromStore(null);
      setStockToStore(null);
      setProductionSelected("");
      setNote('')
      setLoading(false);
      setTypeRequest(0);
    }else{
      if(data){
        setItemSelected([{data: data.item, quantity: data.stock_quantity, stock_from_store: 'Mengecek...', stock_to_store: 'Mengecek...'}]);
        setNote(data.stock_note);
        setDate(moment(data.stock_date).toDate());
        setTypeRequest(data.stock_from_store_id?1:(data.stock_quantity<0?2:0))
        if(data.production_id){
          setProductionSelected({value: data.production_id, label: 'Produksi'})
        }
        if(data.from_store){
          setStoreFromSelected({value: data.from_store.store_id, label: data.from_store.store_name});
          setStockFromStore(data.item.item_id);
        }
        setStoreToSelected({value: data.to_store.store_id, label: data.to_store.store_name});
        setStockToStore(data.item.item_id);
      }
    }
  }, [show, data])

  useEffect(() => {
    if(modalProduk){
      setLoadingProduk(true);
      const store_id = typeRequest===0?storeToSelected.value:storeFromSelected.value;
      api.getTokoDetalMenu(store_id).then((res) => {
        console.log('menu', res)
        if (res?.success) {
          setProdukData(res?.data?.menu);
        }
        setLoadingProduk(false);
      })
    }
  }, [modalProduk, storeFromSelected, storeToSelected])

  useEffect(()=>{
    if(produkData){
      setKey(Object.keys(produkData)[0])
    }
  }, [produkData])

  useEffect(()=>{
    if(show==='add'){
      setItemSelected([]);
    }
  }, [typeRequest, storeFromSelected, storeToSelected])

  useEffect(()=>{
    if(stockToStore){
      checkStock('to', stockToStore)
    }
  }, [itemSelected, stockToStore])

  useEffect(()=>{
    if(stockFromStore){
      checkStock('from', stockFromStore)
    }
  }, [itemSelected, stockFromStore])

  const checkStock = (type, item_id) =>{
    var check = itemSelected.findIndex(x=>x.data.item_id===item_id);
    var ItemSelectedData = [...itemSelected];
    if(check>=0){
      const data_post = {
        item_id: item_id,
        store_id: type==='to'?storeToSelected.value:storeFromSelected.value
      }

      Method
      .post('menu/current_stock', data_post)
      .then((response) => {
        if (response.data.success) {
          if(type==='to'){
            setStockToStore(null);
            ItemSelectedData[check]['stock_to_store'] = response.data.data.menu_current_quantity;
            setItemSelected(ItemSelectedData)
          }else{
            setStockFromStore(null);
            ItemSelectedData[check]['stock_from_store'] = response.data.data.menu_current_quantity;
            setItemSelected(ItemSelectedData)
          }
        }else{
          if(type==='to'){
            setStockToStore(null);
            ItemSelectedData[check]['stock_to_store'] = 'Tidak Ada';
            setItemSelected(ItemSelectedData)
          }else{
            setStockFromStore(null);
            ItemSelectedData[check]['stock_from_store'] = 'Tidak Ada';
            setItemSelected(ItemSelectedData)
          }
        }
      })
    }
  }

  const renderItemSelected = (item, index) => {
    return(
      <Box className="mb-3">
        <div className="d-flex flex-row align-items-center">
          <div className="flex-fill flex-wrap">
            <h5>{ item.data.item_name }</h5>
          </div>
          <div>
            {
              show==='add'?(
                <Style.ButtonDanger
                  className="mt-2"
                  onClick={()=> {
                    var ItemSelectedData = [...itemSelected];
                    ItemSelectedData.splice(index, 1)
                    setItemSelected(ItemSelectedData);
                  }}
                >
                  Hapus
                </Style.ButtonDanger>
              ):(
                <Style.ButtonPrimary
                  className="mt-2"
                  onClick={()=> setModalProduk(true)}
                >
                  Ganti Produk
                </Style.ButtonPrimary>
              )
            }
          </div>
        </div>
        {
          typeRequest!==0 &&
          <div className="d-flex flex-row align-items-center mt-2">
            <div className="flex-fill flex-wrap">
              Stock {storeFromSelected.label}
            </div>
            <div>{item.stock_from_store}</div>
          </div>
        }

        <div className="d-flex flex-row align-items-center mt-2">
          <div className="flex-fill flex-wrap">
            Stock {storeToSelected.label}
          </div>
          <div>{item.stock_to_store}</div>
        </div>

        <hr/>

        <div className="d-flex flex-row align-items-center mt-2">
          <div className="flex-fill flex-wrap">
            Total Input
          </div>
          <div>
            <Form.Control 
              placeholder="Quantity" 
              type="number"
              value={item.quantity}
              onChange={(e)=>{
                var ItemSelectedData = [...itemSelected];
                ItemSelectedData[index]['quantity'] = e.target.value; 
                setItemSelected(ItemSelectedData);
              }} 
            />
          </div>
        </div>
      </Box>
    )
  }

  if(modalProduk===false){
    return (
      <Component.Modal_Component
        size="lg"
        title={show==='add'?'Tambah Request Stock':'Edit Request Stock'}
        btnSubmit
        btnName={loading ? <Component.LoadingIcon /> : "Simpan"}
        onClick={loading ? null : BtnSubmit}
        onHide={onHide}
        show={show}
      >
        <div className="container">
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>Tipe Request</Style.Label>
            <div className="d-flex flex-row">
              <Form.Check 
                type="radio"
                value={0}
                label={`Direct`}
                onChange={() => setTypeRequest(0)}
                name="type_request"
                checked={typeRequest===0}
              />
  
              <Form.Check 
                type="radio"
                value={1}
                label={`Transfer`}
                className="ms-4"
                onChange={() => setTypeRequest(1)}
                name="type_request"
                checked={typeRequest===1}
              />
  
              <Form.Check 
                type="radio"
                value={2}
                label={`Waste`}
                className="ms-4"
                onChange={() => setTypeRequest(2)}
                name="type_request"
                checked={typeRequest===2}
              />
            </div>
          </div>
          <div className="mb-3 row">
            {
              typeRequest!==0 &&
              <div className="col-md-6">
                <Style.Label color={Style.COLOR_SECONDARY}>Dari Toko</Style.Label>
                <Select
                  placeholder="Pilih Toko"
                  options={storeFrom}
                  onChange={(e) => {
                    setStoreFromSelected(e);
                  }}
                  onInputChange={(e) => {
                    setTimeout( async () => {
                      await Method.get(`company/${selected_company.value}/store?store_name=${e}&limit=*`)
                        .then(async (res) => {
                          if (res?.data?.success) {
                            setStoreFrom(
                              res?.data?.data?.map((item) => ({
                                value: item.store_id,
                                label: item.store_name
                              }))
                            )
                          }
                        })
                    }, 400)
                  }}
                  value={storeFromSelected}
                />
              </div>
            }
            <div className={typeRequest===0?"col-md-12":"col-md-6"}>
              <Style.Label color={Style.COLOR_SECONDARY}>Ke Toko</Style.Label>
              <Select
                placeholder="Pilih Toko"
                options={storeTo}
                onChange={(e) => {
                  setStoreToSelected(e);
                }}
                onInputChange={(e) => {
                  setTimeout( async () => {
                    await Method.get(`company/${selected_company.value}/store?store_name=${e}&limit=*`)
                      .then(async (res) => {
                        if (res?.data?.success) {
                          setStoreTo(
                            res?.data?.data?.map((item) => ({
                              value: item.store_id,
                              label: item.store_name
                            }))
                          )
                        }
                      })
                  }, 400)
                }}
                value={storeToSelected}
              />
            </div>
          </div>
          {
            ((typeRequest===0 && storeFromSelected==="" && storeToSelected!=="") || ((typeRequest===1 || typeRequest===2) && storeFromSelected!=="" && storeToSelected!=="")) &&
            <div className="mb-3">
              <Style.Label color={Style.COLOR_SECONDARY}>Pilih Produk</Style.Label>
  
              {
                show==='add'?(
                  <div>
                    {
                      itemSelected.length===0?(
                        <div>Produk belum ditambahkan</div>
                      ):(
                        <div>
                          {
                            itemSelected.map((item, index) => (
                              <div className="mb-2" key={index}>
                                { renderItemSelected(item, index) }
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                    <Style.ButtonPrimary
                      className="mt-2"
                      onClick={()=> setModalProduk(true)}
                    >
                      Tambah Produk
                    </Style.ButtonPrimary>
                  </div>
                ):itemSelected.map((item, index) => (
                  <div className="mb-2" key={index}>
                    { renderItemSelected(item, index) }
                  </div>
                ))
              }
            </div>
          }

          {
            typeRequest===0 &&
            <div className="mb-3">
              <Style.Label color={Style.COLOR_SECONDARY}>Produksi</Style.Label>
              <div>Kosongkan jika tidak perlu produksi</div>
              <div className="d-flex flex-row align-items-center">
                <div className="flex-grow-1">
                  <Select
                    placeholder="Pilih Produksi"
                    options={production}
                    onChange={(e) => {
                      setProductionSelected(e);
                    }}
                    onInputChange={(e) => {
                      setTimeout( async () => {
                        await Method.get(`company/${selected_company.value}/production?production_name=${e}&limit=*`)
                          .then(async (res) => {
                            if (res?.data?.success) {
                              setProduction(
                                res?.data?.data?.map((item) => ({
                                  value: item.production_id,
                                  label: item.production_name
                                }))
                              )
                            }
                          })
                      }, 400)
                    }}
                    value={productionSelected}
                  />
                </div>
                {
                  productionSelected!=="" &&
                  <Style.ButtonDanger 
                    className="ms-2"
                    onClick={()=> setProductionSelected("")}
                  >
                    Hapus
                  </Style.ButtonDanger>
                }
              </div>
            </div>
          }

          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>Catatan</Style.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Tulis catatan..." 
              value={note}
              onChange={(e)=>{
                setNote(e.target.value);
              }} 
              disabled={typeRequest===2}
            />
          </div>

          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>Untuk Tanggal</Style.Label>
            <Datepicker
              selected={date}
              className="form-control"
              onChange={(e) => setDate(e) }
              placeholderText="MM/DD/YYY"
            />
          </div>
        </div>
      </Component.Modal_Component>
    );
  }else{
    return (
      <Component.Modal_Component
        size="lg"
        title={'Pilih Produk'}
        onHide={()=>setModalProduk(false)}
        show={modalProduk}
      >
        <div className="container">
          <b>{typeRequest===0?storeToSelected.label:storeFromSelected.label}</b>
          {
            loadingProduk?(
              <Component.Loadingfunc />
            ):(
              <div>
                {
                  Object.keys(produkData).length===0?(
                    <div className="text-center">Menu tidak ditemukan</div>
                  ):(
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3"
                    >
                      {produkData &&
                        Object.keys(produkData)?.map((item, idx) => (
                          <StyledTab eventKey={item} title={item} key={idx}>
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{ width: "100%" }}
                            >
                              <div
                                className="list-product d-grid gap-4"
                                style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
                              >
                                {produkData[item]?.map((menu, idxMenu) => (
                                  <Card.CardProduct
                                    menu={menu}
                                    key={idxMenu}
                                    onClickDetail={() => {
                                      var check = itemSelected.findIndex(x=>x.data.item_id===menu.item_id);
                                      if(check<0){
                                        if(show==='add'){
                                          setItemSelected([...itemSelected, {data: menu, quantity: 1, stock_from_store: 'Mengecek...', stock_to_store: 'Mengecek...'}]);
                                        }else{
                                          setItemSelected([{data: menu, quantity: 1, stock_from_store: 'Mengecek...', stock_to_store: 'Mengecek...'}]);
                                        }
                                        if(typeRequest!==0){
                                          setStockFromStore(menu.item_id);
                                        }
                                        setStockToStore(menu.item_id);
                                        setModalProduk(false);
                                      }else{
                                        Component.AlertError({ title: "Error", text: 'Produk sudah ditambahkan' });
                                      }
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </StyledTab>
                        ))}
                    </Tabs>
                  )
                }
              </div>
            )
          }
        </div>
      </Component.Modal_Component>
    );
  }
};

const StyledTab = styled(Tab)``;

const Box = styled.div`
  border-radius: 5px;
  background-color: #fff;
  padding:10px;
  border: 1px solid #ccc;
  img {
    border-radius: 5px;
  }
`

export default ModalFormRequest;