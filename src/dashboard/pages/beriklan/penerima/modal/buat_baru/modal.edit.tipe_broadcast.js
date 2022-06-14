import React, {useEffect, useState, useContext} from 'react';
import {AlertError, AlertSuccess, Modal_Component, Tabs, Tab_pane} from "../../../../../../component"
import { COLOR_SECONDARY,Label } from '../../../../../../component/style/content/default';
import Select from "react-select";
import {ExclamationCircle} from "@styled-icons/bootstrap";
import {api_penerima} from "../../../../../../service/api"
import {Context} from "../../../../../../service"

const SMS_tool_tip = `Letakkan daftar penerima pada setiap baris, misalnya : 

628178787897
628178732131
628178780000

Atau letakkan nama header untuk beberapa kolom dengan koma(,) sebagai pemisah:

msisdn,billtotal,nama
628178787897,1000000,Anna
628178732131,9500000,Smith
628178780000,5000000,Joe`


const Email_tool_tip = `
Letakkan daftar penerima pada setiap baris, misalnya : 

test@mail.com
test2@mail.com
test3@mail.com
 
Atau letakkan nama header untuk beberapa kolom dengan koma(,) sebagai pemisah:
 
email,nama,usia
test@mail.com,John,18
test2@mail.com,Tom,33
test3@mail.com,Mark,25
`

export const Modal_tipe_broadcast_edit = ({show, onHide, getData1, recipient_id}) => {
    const [options, setOptions] = useState({
      company:[],
      channel:[],
      inventory:[]
    })
    const [selected, setSelected] = useState({
      company:"",
      channel:"",
      inventory:""
    })
    const [input, setInput] = useState({
      label_penerima:"",
      list_penerima_text:"",
      list_penerima_file:""
    })
    const {data_user} = useContext(Context);
    const [loading, setLoading] = useState(false)


    const getData = async()=>{
      

      await api_penerima.get_ms_channel()
      .then(res =>{
        console.log({get_ms_channel:res})
      })

      await api_penerima.get_product({})
      .then(res =>{
        if(res?.success){
          setOptions(state => ({...state,channel:res.data.map(item=>({value:item.ms_inventory.ms_inventory_id, label:item.ms_inventory.ms_inventory_identifier}))}))
          setOptions(state => ({...state,inventory:res.data.map(item=>({value:item.ms_channel.ms_channel_id, label:item.ms_channel.ms_channel_name}))}))
          setSelected(state => ({...state , inventory:({value:res.data[0].ms_channel.ms_channel_id, label:res.data[0].ms_channel.ms_channel_name})}))
        }
        console.log({get_product:res})
      })
      await api_penerima.get_penerima_company()
      .then(res =>{
        console.log({get_penerima_company:res})
        if(res?.success){
          setOptions(state => ({...state, company:res.data.map(item=>({value:item.company_id , label:item.company_name}))}))
        }
      })

      await api_penerima.get_file({recipient_id})
      .then(res =>{
        console.log({get_file:res})
        setInput(state=>({...state, list_penerima_text:res}))
      })


      await api_penerima.get_penerima_detail({recipient_id})
      .then(res =>{
        console.log({get_penerima_detail:res})
        if(res?.success){
          setInput(state=>({...state, label_penerima:res.data.recipient_label}))
          setSelected(state=>({...state, channel:({value:res.data.ms_inventory.ms_inventory_id, label:res.data.ms_inventory.ms_inventory_identifier})}))
          setSelected(state=>({...state, company:({value:res.data.company.company_id, label:res.data.company.company_name})}))
        }
      })

    }


    useEffect(()=>{
      if(show){
        getData()
      }
    },[show])

  

    const btnSimpan = async() => {
      setLoading(true)
      const body={
                company_id: selected.company.value,
                ms_channel_id: selected.inventory.value,
                ms_inventory_id: selected.channel.value,
                recipient_label: input.label_penerima,
                recipient_list: input.list_penerima_text,
                user_id: data_user.id
              }

              console.log("ini body nyaa untuk edit", body)
            
      await api_penerima.put_penerima_broadcast({body:body,recipient_id})
      .then(async res =>{
        if(res?.success){
          if(input.list_penerima_file.size){
            const formData = new FormData()

            formData.append("file_upload", input.list_penerima_file)
            formData.append("recipient_id", res.data.recipient_id)

            for (var pair of formData.entries()) {
              console.log(pair[0]+ ', ' + pair[1]); 
            }
            await api_penerima.put_upload_file_receipt({body:formData, receipt_id:res.data.recipient_id})
            .then(async res =>{
              console.log({put_upload_file_receipt:res})
              if(res?.success){
               await AlertSuccess({title:"SUCCESS", text:res.success})
               await onHide();
              await setSelected({
                company:"",
                channel:"",
                inventory:""
              })
              await setOptions({
                company:[],
                channel:[],
                inventory:[]
              })
              await setInput({
                label_penerima:"",
                list_penerima_text:"",
                list_penerima_file:""
              })
              await getData1()
              }
              else{
                AlertError({title:"ERROR", text:res.error})
              }
            })
          }
          else{
            console.log({post_penerima_broadcast:res})
            await AlertSuccess({title:"SUCCESS", text:res.success});
            await onHide();
            await setSelected({
              company:"",
              channel:"",
              inventory:""
            })
            await setOptions({
              company:[],
              channel:[],
              inventory:[]
            })
            await setInput({
              label_penerima:"",
              list_penerima_text:"",
              list_penerima_file:""
            })
            await getData1()
          }


        }
        else{
          AlertError({title:"ERROR", text:res.error})
        }
        setLoading(false)
      })
    }


// const btnUpload=async () =>{
// const formData = new FormData()
// formData.append("file_upload", input.list_penerima_file)
// formData.append("recipient_id", recipient_id)

// for (var pair of formData.entries()) {
//   console.log(pair[0]+ ', ' + pair[1]); 
// }

// await api_penerima.put_upload_file_receipt({body:formData, receipt_id:recipient_id})
// .then(res =>{
//   console.log("ini dia hahahaha", res)
// })
// }

    return (
        <Modal_Component show={show} onHide={onHide} title="Penerima Edit" btnSubmit={loading?false:true} btnName="Simpan" onClick={btnSimpan}>
          {/* <input type="file" name="" id="" accept=".csv" onChange={(e)=>setInput({...input, list_penerima_file:e.target.files[0]})} />
          <button onClick={btnUpload}>upload</button> */}
            <div className="container">
                <div className="mb-3 mb-md-3">
                    <Label color={COLOR_SECONDARY}>Label Penerima</Label>
                    <input type="text" className="form-control" placeholder='Masukkan label penerima' value={input.label_penerima} onChange={(e)=>setInput({...input, label_penerima:e.target.value})} disabled={loading?true:false} />
                </div>
                <div className="mb-3 mb-md-3">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <Label color={COLOR_SECONDARY}>Channel</Label>
                          <Select placeholder="Pilih Tipe Channel" value={selected.channel} options={options.channel} onChange={(e)=>setSelected({...selected, channel:e})} isDisabled={loading?true:false} />
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <Label color={COLOR_SECONDARY}>Inventory</Label>
                          <Select placeholder="Pilih Tipe Channel" value={selected.inventory} isDisabled options={options.inventory} />
                        </div>
                    </div>
                </div>

                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Perusahaan</Label>
                  <Select placeholder="Pilih Perusahaan" value={selected.company} options={options.company} onChange={(e)=>setSelected({...selected, company:e})} isDisabled={loading?true:false} />
                </div>
                

                <div className="mb-3 mb-md-3">
                  <section className="mb-3 mb-md-3">
                    <Label color={COLOR_SECONDARY}>List Penerima</Label>
                  </section>

                  <section className="mb-3 mb-md-3">
                    {
                      selected.channel.value && selected.channel.value ===1?
                    <div style={{textDecoration:"underline dotted", cursor:"pointer"}} data-bs-toggle="tooltip" data-bs-placement="top" title={Email_tool_tip}>
                      Petunjuk Email Penerima <ExclamationCircle style={{width:"15px"}} />
                    </div>
                      :selected.channel.value && selected.channel.value ===2?
                    <div style={{textDecoration:"underline dotted", cursor:"pointer"}} data-bs-toggle="tooltip" data-bs-placement="top" title={SMS_tool_tip}>
                      Petunjuk SMS Penerima <ExclamationCircle style={{width:"15px"}} />
                    </div>
                    :null
                    }
                  </section>
                <Tabs>
                  <Tab_pane name="Text" key="1">
                    <textarea className='form-control' value={input.list_penerima_text} onChange={(e)=>setInput({...input , list_penerima_text:e.target.value})} disabled={loading?true:false} />
                  </Tab_pane>
                  <Tab_pane name="File" key="2">
                    <input type="file" accept='.csv' name="" id="" className="form-control"  onChange={(e)=>setInput({...input , list_penerima_file:e.target.files[0]})} disabled={loading?true:false} />
                    {
                      input.list_penerima_file &&
                      <div className="border">
                          {input.list_penerima_file.name}
                      </div>
                    }
                  </Tab_pane>
                  
                </Tabs>
                </div>
            </div>
        </Modal_Component>
    )
}
