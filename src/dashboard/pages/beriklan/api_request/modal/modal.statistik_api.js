import React,{useState, useEffect} from 'react'
import { ChartBar, Modal_Component,AlertError } from '../../../../../component'
import { COLOR_SECONDARY, Label } from '../../../../../component/style/content/default'
import Select from "react-select"
import { api_request } from '../../../../../service/api';
import moment from "moment";
import DatePicker from "react-datepicker"

const optInterval = [
  {value:"1y", label:"year"},
  {value:"1q", label:"quarter"},
  {value:"1m", label:"month"},
  {value:"1w", label:"week"},
  {value:"1d", label:"day"},
  {value:"1h", label:"hour"},
]

export const Modal_statistik_api = ({show,onHide}) => {
  const [input, setInput] = useState({
    from_date:null,
    end_date:null,
    selected_api_status:null,
    selected_company:null,
    selected_api_media:null,
    selected_api_channel:null,
    selected_interval:null
  })

  const [options, setOptions] = useState({
    api_status:[],
    company:[],
    api_media:[],
    api_channel:[],
    interval:[]
  })

  const [data_chart, setData_chart] = useState([])

  const onChangeValueInput = (e) =>{
    setInput(state=>({...state, [e.target.name]:e.target.value}))
  } 

  const onChangeValueSelect = (e,name) =>{
    if(name === "selected_api_media"){
      api_request.get_product({api_media:e.label})
      .then(res =>{
        console.log({get_product:res})
        if(res?.success){
          setOptions(state=>({...state, api_channel:res.data.map(item =>({value:item.api_channel, label:item.api_channel}))}))
        }
      })
      setInput(state =>({...state, [name]:e}))
    }
    else{
      setInput(state =>({...state, [name]:e}))
    }
  }

  useEffect(()=>{
    if(show ===true){
      api_request.get_company()
      .then(res =>{
        console.log({get_company:res})
        if(res?.success){
          setOptions(state=>({...state, company:res.data.map(item =>({value:item.company_id, label:item.company_name}))}))
        }
      })

      api_request.get_product({})
      .then(res =>{
        console.log({get_product:res})
        if(res?.success){
          let result = [...new Map(res.data.map(item => [item.api_media, item])).values()]
          setOptions(state=>({...state, api_media:result.map(item => ({value:item.api_media , label:item.api_media})) }))
        }
      })

      api_request.get_status()
      .then(res =>{
        console.log({get_status:res})
        if(res?.success){
          setOptions(state =>({...state, api_status:res.data.map(item => ({value:item.status_id , label:item.status_name}))}))
        }
      })
    }
  },[show])

  const btnGenerate = async() =>{
    await api_request.get_summary({
      api_status:input.selected_api_status?.value,
      company_id:input.selected_company?.value,
      api_media:input.selected_api_media?.value,
      api_channel : input.selected_api_channel?.value,
      api_from_date: input.from_date ? moment(input.from_date).format("YYYY-MM-DD"):null,
      api_until_date : input.end_date? moment(input.end_date).format("YYYY-MM-DD"):null,
      calendar_interval : input.selected_interval?.value
    })
    .then(res =>{
      console.log({get_summary:res})
      if(res?.success){
        setData_chart(res.data)
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
    })
  }

  return (
    <Modal_Component size="xl" show={show} onHide={onHide} title="Statistik API" btnSubmit btnName="Generate Chart" onClick={btnGenerate}  >
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>From Date</Label>
              {/* <input type="date" className="form-control" name="from_date" id="" value={input.from_date} onChange={onChangeValueInput} /> */}
              <DatePicker className="form-control" selected={input.from_date} onChange={e=>setInput(state=>({...state, from_date:e}))} selectsStart startDate={input.from_date} endDate={input.end_date} dateFormat="yyyy-MMM-dd" />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Until Date</Label>
              {/* <input type="date" className="form-control" name="end_date" id="" value={input.end_date} onChange={onChangeValueInput} /> */}
              <DatePicker className="form-control" selected={input.end_date} onChange={e=>setInput(state=>({...state, end_date:e}))} selectsEnd startDate={input.from_date} endDate={input.end_date} minDate={input.from_date} dateFormat="yyyy-MMM-dd" />
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>API Status</Label>
              <Select placeholder="Pilih Status" options={options.api_status} value={input.selected_api_status} onChange={(e)=>onChangeValueSelect(e,"selected_api_status")} />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Perusahaan</Label>
              <Select placeholder="Pilih Perusahaan" options={options.company} value={input.selected_company} onChange={(e)=>onChangeValueSelect(e,"selected_company")} />
            </div>
          </div>
        </div>


        {/* ROW 3 */}
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>API Media</Label>
              <Select placeholder="Pilih Media API" options={options.api_media} value={input.selected_api_media} onChange={(e)=>onChangeValueSelect(e,"selected_api_media")} />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>API Channel</Label>
              <Select placeholder="Pilih Channel API" options={options.api_channel} value={input.selected_api_channel} onChange={(e)=>onChangeValueSelect(e,"selected_api_channel")} />
            </div>
          </div>
        </div>


        {/* ROW 4 */}
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Interval</Label>
              <Select placeholder="Pilih Interval" options={optInterval} value={input.selected_interval} onChange={(e)=>onChangeValueSelect(e,"selected_interval")} />
            </div>
          </div>
        </div>

        {/* ROW 5 */}
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="mb-3 mb-md-3">
              <ChartBar 
                label="Statistik API"
                labels={data_chart.map(item=>item.datetime)}
                data_single={data_chart.map(item =>item.count)}
                color={COLOR_SECONDARY}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal_Component>
  )
}
