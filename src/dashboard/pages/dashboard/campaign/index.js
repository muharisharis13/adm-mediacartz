
import Select from "react-select";
import { Title } from "../style"
import React,{useState} from "react"
import { IdxCardCampaign } from "../card.campaign";
import {DashboardService} from "../../../../service/api"
import {decrypt} from "../../../../service";
import Cookies from "js-cookie";
import {Modal_create_campaign} from "../../beriklan/kampanye_iklan/modal/modal.create_campaign"



export const IdxCampaign = ({ data,selected,setSelected, options,setOptions ,setData}) => {
  const [modal, setModal] = useState({
    create_campaign:false
  })
  const [data_parsing, setData_parsing] = useState({
    ms_product_id:null,
    ms_product_name:null
  })
  const company = Cookies.get("company") ? decrypt(Cookies.get("company")) : {}


  const onChangeSelect=async (e)=>{
    await DashboardService.get_list({company_id:company.company_id, last:e.value})
    .then(res =>{
      console.log({get_list:res})
      if(res?.success){
        setData(state=>({...state, list:res.data}))
      }
      setSelected(state=>({...state, last:e}))
    })
  }

  console.log("ini summary",data?.summary_product)

  const btnCreatecampaign = (item)=>{
    setModal(state=>({...state, create_campaign:true}))
    setData_parsing(state=>({
      ...state,
      ms_product_id:item.ms_product_id,
      ms_product_name:item.ms_product_name
    }))
  }
  return (
    <section>
        {/* MODAL ============= */}
          <Modal_create_campaign show={modal.create_campaign} onHide={()=>setModal(state=>({...state, create_campaign:false}))} props={data_parsing} />

        {/* MODAL ============= */}

      <div className="row justify-content-between mb-3 mb-md-3">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <Title className="mb-2">Ringkasan campaign</Title>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <Select placeholder="Filter" options={options.last} value={selected.last} onChange={(e)=>onChangeSelect(e)} />
        </div>
      </div>

      <div className="row">
        {
          data?.summary_product ? data?.summary_product?.map((item, idx) => (
            <div className="col-lg-3 col-md-4 col-sm-12 mb-3 mb-md-3" key={idx}>
              <IdxCardCampaign 
                title={item.ms_product_name} 
                number={item.total ? item.total:0}
                onClick={()=>btnCreatecampaign(item)}
              />
            </div>

          ))
            : null
        }
        {/* <div className="col-lg-3 col-md-4 col-sm-12 mb-3 mb-md-3">
          <IdxCardCampaign title="Digital Signage" number="0" />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 mb-3 mb-md-3">
          <IdxCardCampaign title="TV & Radio" number="0" />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 mb-3 mb-md-3">
          <IdxCardCampaign title="Social Media" number="0" />
        </div> */}
      </div>
    </section>
  )
}