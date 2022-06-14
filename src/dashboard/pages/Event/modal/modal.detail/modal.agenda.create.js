import React,{useState, useEffect} from "react"
import * as Component from "../../../../../component";
import * as Style from "../../../../../component/style/content/default";
import * as Services from "../../../../../service"
import * as Api from "../../../../../service/api"
import {useForm} from "react-hook-form"
import styled from "styled-components";
import DatePicker from "react-datepicker";
import moment from "moment"


const ModalAgendaCreate = (props:{onHide:Function, show:boolean,id:number,data_modal:any}) =>{
  const {show, onHide,id,data_modal} = props;
  const {
    register,
    handleSubmit,
    formState:{errors},
    setValue
  } = useForm()
  const [input, setInput] = useState({
    from_date: new Date(),
    end_date: new Date()
  })
  const [loading, setLoading] = useState(false)


  const btnSimpan =(data) =>{
    setLoading(true)
    const body ={
      event_agenda_title: data?.judul_agenda,
			event_agenda_description: data?.deskripsi,
			event_agenda_speaker_name: data?.nama_pembicara,
			event_agenda_speaker_position: data?.jataban_pembicara,
			event_agenda_start_datetime: moment(input.from_date).format("YYYY-MM-DD HH:mm:ss"),
			event_agenda_end_datetime: moment(input.end_date).format("YYYY-MM-DD HH:mm:ss"),
			event_id: id,
    }


    if(data_modal?.event_agenda_id){
      Api.ApiEvent.Event.putAgenda(data_modal?.event_agenda_id,body)
      .then(async res =>{
        console.log(res)
        if(res?.success){
          // alert(res.success)
          await <Component.AlertSuccess title="Success" text={res.success} />
          await btnClose()
        }
        else{
          await <Component.AlertError title="Error" text={res.error} />
        }
        setLoading(false)
      })

    }
    else{
      Api.ApiEvent.Event.postAgenda(body)
      .then(async res =>{
        console.log(res)
        if(res?.success){
          // alert(res.success)
          await <Component.AlertSuccess title="Success" text={res.success} />
          await btnClose()
        }
        else{
          await <Component.AlertError title="Error" text={res.error} />
        }
        setLoading(false)
      })

    }

  }

  const btnClose =() =>{
    setValue("judul_agenda","")
    setValue("deskripsi","")
    setValue("nama_pembicara","")
    setValue("jataban_pembicara","")
    onHide()

  }

  useEffect(()=>{
     if(show === true){
      setValue("judul_agenda",data_modal?.event_agenda_title)
      setValue("deskripsi",data_modal?.event_agenda_description)
      setValue("nama_pembicara",data_modal?.event_agenda_speaker_name)
      setValue("jataban_pembicara",data_modal?.event_agenda_speaker_position)
      setInput(state=>({
        ...state,
        from_date: new Date(moment(data_modal?.event_agenda_start_datetime).format("YYYY-MM-DD HH:mm:ss")),
        end_date: new Date(moment(data_modal?.event_agenda_end_datetime).format("YYYY-MM-DD HH:mm:ss"))
      }))

    }
  },[show])


  return(
    <Component.Modal_Component show={show} onHide={btnClose} title="Agenda" size="xl" btnSubmit btnName={loading ? <Component.LoadingIcon /> : "Simpan"} onClick={loading ? null: handleSubmit(btnSimpan)} >
      <Container className="container" onSubmit={handleSubmit(btnSimpan)}>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY} htmlFor="judul_agenda" className="mb-2">
            Judul Agenda
          </Style.Label>
          <input type="text" id="judul_agenda" placeholder="Masukkan Judul Agenda" className="form-control" 
            {...register("judul_agenda",{required:true})}
          />
          {
            errors.judul_agenda && "is Required"
          }
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY} htmlFor="deskripsi" className="mb-2">
            Deskripsi
          </Style.Label>
          <textarea type="text" id="deskripsi" placeholder="Masukkan Judul Agenda" className="form-control" 
            {...register("deskripsi",{required:true})}
          />
          {
            errors.deskripsi && "is Required"
          }
          
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY} htmlFor="Nama Pembicara" className="mb-2">
            Nama Pembicara
          </Style.Label>
          <input type="text" id="Nama Pembicara" placeholder="Masukkan Judul Agenda" className="form-control" 
            {...register("nama_pembicara",{required:true})}
          />
          {
            errors.nama_pembicara && "is Required"
          }
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY} htmlFor="Jabatan Pembicara" className="mb-2">
            Jabatan Pembicara
          </Style.Label>
          <input type="text" id="Jabatan Pembicara" placeholder="Masukkan Judul Agenda" className="form-control" 
            {...register("jataban_pembicara",{required:true})}
          />
          {
            errors.jataban_pembicara && "is Required"
          }
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 col-lg-6">
            <div className="mb-3">
              <Style.Label color={Style.COLOR_SECONDARY} htmlFor="Tanggal Mulai" className="mb-2">
                Tanggal Mulai
              </Style.Label>
              <DatePicker className="form-control" id="Tanggal Mulai" placeholderText="Tanggal Mulai"
                selected={input.from_date} 
                showTimeSelect 
                onChange={e=>setInput(state=>({...state, from_date:e}))} 
                selectsStart 
                startDate={input.from_date} 
                endDate={input.end_date} 
                dateFormat="yyyy-MMM-dd, hh:mm:ss" 
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-lg-6">
            <div className="mb-3">
              <Style.Label color={Style.COLOR_SECONDARY} htmlFor="Tanggal Berakhir" className="mb-2">
                Tanggal Berakhir
              </Style.Label>
              <DatePicker className="form-control" id="Tanggal Berakhir" placeholderText="Tanggal Berakhir"
                selected={input.end_date} 
                showTimeSelect 
                onChange={e=>setInput(state=>({...state, end_date:e}))} 
                selectsEnd 
                startDate={input.from_date} 
                endDate={input.end_date} 
                minDate={input.from_date} 
                dateFormat="yyyy-MMM-dd, hh:mm:ss" 
              />
            </div>
          </div>
        </div>
      </Container>
    </Component.Modal_Component>
  )
}

export default ModalAgendaCreate;

const Container = styled.form `
    background-color: #fff;
    box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
    color: rgba(10, 10, 10, 0.5);
    max-width: 100%;
    position: relative;
    border-radius: 10px;
    padding:10px;
`