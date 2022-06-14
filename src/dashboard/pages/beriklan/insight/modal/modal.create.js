import React, {useState, useEffect, useContext} from "react";
import {AlertSuccess, Modal_Component, Pagination,AlertError} from "../../../../../component";
import PropTypes from "prop-types"
import { COLOR_DANGER, COLOR_SECONDARY, Label } from "../../../../../component/style/content/default";
import Select from "react-select"
import { api_insight } from "../../../../../service/api";
import {Context} from "../../../../../service";
import {Table} from "react-bootstrap";
import styled from "styled-components";
import {PlusCircleDotted} from "@styled-icons/bootstrap";
import {MinusCircleOutline} from "@styled-icons/evaicons-outline"
import { Moment } from "../../../../../util";

export const Modal_create = ({show,onHide, getData,props}) =>{
  const [input, setInput] = useState({
    insight_name:"",
    selected_company:"",
    campaign_id:[],
    event_id:[]
  })
  const [options, setOptions]  = useState([]);
  const {data_user} = useContext(Context);
  const [data_campagin, setData_campaign] = useState({
    data:[],
    page:1,
    last_page:1
  })
  const [data_event, setData_event] = useState({
    data:[],
    page:1,
    last_page:1
  })

  useEffect(()=>{
    if(show===true){
      api_insight.get_company()
      .then(res =>{
        console.log({get_company:res})
        if(res?.success){
          setOptions(res.data.map(item =>({value:item.company_id, label:item.company_name})))

          // jika props ada maka lakukan ini ===> untuk edit data
          if(props.data){
            setInput(state=>({...state,
            selected_company: {
              value:res.data.find(find => find.company_id === props.data.company_id).company_id,
              label: res.data.find(find => find.company_id === props.data.company_id).company_name
            }
            }))

            api_insight.get_campaign({company_id:props.data.company_id})
            .then(res =>{
              console.log({get_campaign:res})
              if(res?.success){
                setData_campaign(state=>({...state,
                  data:res.data,
                  page:res.page,
                  last_page:res.last_page
                }))
              }
            })
          }
          // jika props ada maka lakukan ini ===> untuk edit data
        }
      })

      // jika props ada maka lakukan ini ===> untuk edit data
      
      if(props.data){
        setInput({...input,
          insight_name: props.data?.programme_name,
          campaign_id: props.data?.programme_monitor ? JSON.parse(props.data.programme_monitor).campaign_id:[],
          event_id : props.data?.programme_monitor ? JSON.parse(props.data.programme_monitor).event_id:[],
        })

      }
      // jika props ada maka lakukan ini ===> untuk edit data
    }
  },[show])

  const onChangeValue = (e) =>{
    setInput(state=>({...state, [e.target.name]:e.target.value}))
  }

  const onChangeSelect = (e,name)=>{
    setInput(state=>({...state, [name]:e}))
    api_insight.get_campaign({company_id:e.value})
    .then(res =>{
      console.log({get_campaign:res})
      if(res?.success){
        setData_campaign(state=>({...state,
          data:res.data,
          page:res.page,
          last_page:res.last_page
        }))
      }
    })

    api_insight.get_event_id({})
    .then(res =>{
      console.log({get_event_id:res})
      if(res?.success){
        setData_event(state=>({...state,
          data:res.data,
          page:res.page,
          last_page:res.last_page
        }))
      }
    })
  }

  const btnSimpan = () =>{
    const body ={
      user_id : data_user.id,
      company_id:input.selected_company.value,
      programme_name : input.insight_name,
      programme_monitor:{
        campaign_id:input.campaign_id,
        event_id:input.event_id
      }
    }

    if(props.name === "Ubah"){
      api_insight.put_edit_insight({programme_id:props.id, body:body})
      .then(async res =>{
        if(res?.success){
          await AlertSuccess({title:"SUCCESS", text:res.success})
          await onHide();
          await getData();
          setInput({
            insight_name:"",
            selected_company:"",
            campaign_id:[],
            event_id:[]
          })
        }
        else{
          await AlertError({title:"ERROR", text:res.error})
        }
      })
    }
    else{
      api_insight.post_create_insight({body:body})
      .then(async res =>{
        console.log({post_create_insight:res})
        if(res?.success){
          await AlertSuccess({title:"SUCCESS", text:res.success})
          await onHide();
          await getData();
          setInput({
            insight_name:"",
            selected_company:"",
            campaign_id:[],
            event_id:[]
          })
        }
        else{
          await AlertError({title:"ERROR", text:res.error})
        }
      })

    }

  }

  const btnAddCampaign = (id,name) =>{
    if(name === "plus"){
      setInput(state =>({...state,
        campaign_id:[...input.campaign_id,id]
      }))
    }
    else if(name === "minus"){
      let filter = input?.campaign_id.filter(filter => filter !== id)
      setInput(state=>({...state,
        campaign_id:filter
      }))
    }
  }

  const btnAddEvent = (id,name) =>{
    if(name === "plus"){
      setInput(state =>({...state,
        event_id:[...input.event_id,id]
      }))
    }
    else if(name === "minus"){
      let filter = input?.event_id.filter(filter => filter !== id)
      setInput(state=>({...state,
        event_id:filter
      }))
    }
  }

  const btnPaginationEvent = (e)=>{
    api_insight.get_event_id({page:e.selected +1})
    .then(res =>{
      console.log({get_event_id:res})
      if(res?.success){
        setData_event(state=>({...state,
          data:res.data,
          page:res.page,
          last_page:res.last_page
        }))
      }
    })
  }

  const btnPaginationCampaign = (e) =>{

    api_insight.get_campaign({company_id:input.selected_company.value,page:e.selected+1})
    .then(res =>{
      console.log({get_campaign:res})
      if(res?.success){
        setData_campaign(state=>({...state,
          data:res.data,
          page:res.page,
          last_page:res.last_page
        }))
      }
    })
  }

  const btnClose = async() =>{
    await onHide();
    await setInput({
      insight_name:"",
      selected_company:"",
      campaign_id:[],
      event_id:[]
    })
  }


console.log("ini props", props)
  return (
    <Modal_Component show={show} onHide={btnClose} title="Insight" size="xl" btnSubmit btnName="Simpan" onClick={btnSimpan}>
      <div className="container mb-3 mb-md-3">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Insight Name</Label>
          <input type="text" name="insight_name" placeholder="Insight Name" id="" className="form-control" value={input.insight_name} onChange={onChangeValue} />
        </div>
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Perusahaan</Label>
          <Select isDisabled={props?.name === "Ubah" ? true:false} placeholder="Select Perusahaan" options={options} value={input.selected_company} onChange={(e)=>onChangeSelect(e,"selected_company")} />
        </div>
      </div>

      <div className="container mb-3 mb-md-3 mt-5 mt-md-5" >
        <div>
          <Label color={COLOR_SECONDARY}>{`Choose Campaign : ${input.campaign_id}`}</Label>
          <Table responsive bordered hover striped >
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Nama Campaign</th>
                <th>Jadwal Campaign</th>
                <th>Total Penerima</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {
                data_campagin?.data?.map((item,idx)=>(
                  <tr key={idx}>
                    <td>#{item.campaign_id}</td>
                    <td>{item.campaign_name}</td>
                    <td>{item.campaign_date[0]?.campaign_date_from_datetime && Moment(item.campaign_date[0]?.campaign_date_from_datetime)}</td>
                    <td>{item.campaign_total_recipient}</td>
                    <td>
                      <DivStatus status={item.campaign_status_name}>{item.campaign_status_name}</DivStatus>
                    </td>
                    <td>
                    {
                      input?.campaign_id.find(find=>find === item.campaign_id)?
                      <div className="d-flex align-items-center justify-content-center">
                        <div style={{marginLeft:"16px"}}>
                          <MinusCircleOutline width={20} cursor="pointer" onClick={()=>btnAddCampaign(item.campaign_id,"minus")} />
                        </div>
                      </div>
                      :
                      <div className="d-flex align-items-center justify-content-center">
                        <div style={{marginLeft:"16px"}}>
                          <PlusCircleDotted width={20} cursor="pointer" onClick={()=>btnAddCampaign(item.campaign_id,"plus")} />
                        </div>
                      </div>
                    }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div>
          <Pagination totalPage={data_campagin?.last_page} page={data_campagin?.page} handleOnChange={btnPaginationCampaign} />
        </div>
      </div>


      <div className="container mb-3 mb-md-3">
        <div>
          <Label color={COLOR_SECONDARY}>{`Choose Event : ${input.event_id}`}</Label>
          <Table responsive bordered hover striped >
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Nama Event</th>
                <th>Jadwal Event</th>
                <th>Kategori Event</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {
                data_event?.data?.map((item,idx)=>(
                  <tr key={idx}>
                    <td>#{item.event_id}</td>
                    <td>{item.event_name}</td>
                    <td>{Moment(item.event_start_datetime)}</td>
                    <td>{item.category_event?.category_event_name}</td>
                    <td>
                      <DivStatus status={item.event_expired_status_name}>{item.event_expired_status_name}</DivStatus>
                    </td>
                    <td>
                    {
                      input?.event_id.find(find=>find === item.event_id)?
                      <div className="d-flex align-items-center justify-content-center">
                        <div style={{marginLeft:"16px"}}>
                          <MinusCircleOutline width={20} cursor="pointer" onClick={()=>btnAddEvent(item.event_id,"minus")} />
                        </div>
                      </div>
                      :
                      <div className="d-flex align-items-center justify-content-center">
                        <div style={{marginLeft:"16px"}}>
                          <PlusCircleDotted width={20} cursor="pointer" onClick={()=>btnAddEvent(item.event_id,"plus")} />
                        </div>
                      </div>
                    }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div>
          <Pagination totalPage={data_event?.last_page} page={data_event?.page} handleOnChange={btnPaginationEvent} />
        </div>
      </div>
    </Modal_Component>
  )
}

const DivStatus = styled.div `
display:flex;
background-color: ${({status})=>status==="expired"? COLOR_DANGER :status ==="pending" || status === "draft" ? "#cccc" : COLOR_SECONDARY};
color:${({status})=> status === "pending" || status === "draft" ? "#000":"#ffff"};
align-items:center;
justify-content: center;
border-radius:5px;
padding:5px;
`

Modal_create.defaultProps = {
  show :false,
}

Modal_create.propTypes = {
  show : PropTypes.bool,
  onHide : PropTypes.func,
  getData : PropTypes.func,
  props: PropTypes.object
}