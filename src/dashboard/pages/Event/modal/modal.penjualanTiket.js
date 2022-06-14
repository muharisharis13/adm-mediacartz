import React, {useEffect,useState} from "react"
import * as Component from "../../../../component"
import * as Style from "../../../../component/style/content/default";
import * as Services from "../../../../service"
import * as Util from "../../../../util"
import {useForm} from "react-hook-form"

const header = ["No", "No Booking", "Tanggal Tiket", "Tanggal Dicetak", "Tanggal Discan", "Nama Tiket", "Harga", "Nomor Tiket", "Status", "Dicetak Oleh", "Aksi"]



export default function ModalPenjualanTiket(props:{show:boolean;onHide:Function,data_props:Object}){
  const {show,onHide,data_props} = props;
  const {register,getValues, setValue ,handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      nomorBooking:"",
      nomorKursi:"",
      nama:"",
      page:1,
      lastPage:1,
      data:[],
      loading:false
    }
  });

  const {data,page,lastPage} = getValues();
  const [loading, setLoading] = useState(false)





  const getData =async()=>{
    let query ="";
    const {nomorBooking,nomorKursi,nama,page} = getValues()
    setValue("page",1)

    if(nomorBooking) query = `${query}&ticket_booking_number=${nomorBooking}`;
    if(nomorKursi) query = `${query}&ticket_seat_number=${nomorKursi}`;
    if(nama) query = `${query}&issued_for_user_name=${nama}`
    
    setLoading(true)
    await Services.api.ApiEvent.Event.getTiket({
      organizer_id:data_props?.organizer_id,
      event_id:data_props?.event_id,
      page:page,
      query:query
    })
    .then(async res =>{
      console.log("get Tiket",res)
      if(res.success){
        await setValue("data",res.data);
        await setValue("lastPage",res.last_page);
        await setValue("page",res.page);
      }
      else{
        Component.AlertError({title:"ERROR", text:res.error})
      }
      await setLoading(false)
    })
  }


  useEffect(()=>{
    if(show){
      getData()
    }
  },[show])


  const btnPagination = async(e) =>{
    await setValue("page", e.selected + 1)
    await getData()
  }

  const btnFilter = async() =>{
    await getData()
  }

  const btnReset = async() =>{
    await setValue("nama","")
    await setValue("nomorBooking","")
    await setValue("nomorKursi","")
    await getData()
  }

  const btnuseTicket = async(item) =>{
    await Component.AlertQuestion({title:"Question", text:`Do you wan to mark ticke #${item.ticket_booking_number} as attended ?`})
    .then(async res =>{
      if(res.isConfirmed){
        await Services.api.ApiEvent.Event.putAttendTicket({
          event_id:item.event_id,
          ticket_id:item.ticket_id
        })
        .then(async result =>{
          if(result?.success){
            await Component.AlertSuccess({title:"Success", text:result.success})
            await getData()
          }
        })
      }
    })
  }

  return (
    <Component.Modal_Component show={show} onHide={onHide} title={`Penjualan Tiket Untuk Event ${data_props?.event_name}`} size="xl">
        <div className="wrap-input">
          <div className="mb-3">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12">
                  <Style.Label color={Style.COLOR_SECONDARY}>
                    Nomor Booking
                  </Style.Label>
                  <input type="text" placeholder="Masukkan Nomor Kode booking" className="form-control" 
                    {...register("nomorBooking")} 
                  />
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12">
                  <Style.Label color={Style.COLOR_SECONDARY}>
                    Nomor Kursi
                  </Style.Label>
                  <input type="text" placeholder="Masukkan Nomor Kursi " className="form-control" 
                    {...register("nomorKursi")}
                  />
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12">
                  <Style.Label color={Style.COLOR_SECONDARY}>
                    Nama
                  </Style.Label>
                  <input type="text" placeholder="Masukkan Nama" className="form-control" 
                    {...register("nama")}
                  />
              </div>
            </div>
          </div>
          <div className="mb-3 d-flex gap-3 align-items-center justify-content-center">
            <Style.ButtonPrimary onClick={btnFilter}>
              Filter Tiket
            </Style.ButtonPrimary>
            <button className="btn border" onClick={btnReset}>
              Reset
            </button>
          </div>


            <div className="mb-3 table-data">
              {/* table data */}

              <Component.TableData header={header}>
                {
                  loading? <Component.Loadingfunc /> :
                  data?.length > 0 ?
                  data?.map((item:any,idx:number)=>(
                    <tr>
                      <td data-label="No">
                        {
                          Util.Numeric({idx,page:page})
                        }
                      </td>
                      <td data-label="Nomor Booking">
                        {
                          item.ticket_booking_number
                        }
                      </td>
                      <td data-label="Tanggal Tiket">
                        {
                          Util.Moment(item.ticket_datetime)
                        }
                      </td>
                      <td data-label="Tanggal Dicetak">
                        {
                          Util.Moment(item.ticket_issued_datetime)
                        }
                      </td>
                      <td data-label="Tanggal Discan">
                        {
                          Util.Moment(item.ticket_used_datetime)
                        }
                      </td>
                      <td data-label="Nama Tiket">
                        {
                          item.ticket_name
                        }
                      </td>
                      <td data-label="Harga">
                        {
                          Util.FormatCurrency.currency(item.ticket_price)
                        }
                      </td>
                      <td data-label="Nomor Tiket">
                        {
                          item.ticket_seat_number ?? "-"
                        }
                      </td>
                      <td data-label="Status">
                        <div dangerouslySetInnerHTML={{__html:Util.displayStatus(item.ticket_status_name)}} />
                      </td>
                      <td data-label="Dicetak Oleh">
                        {item?.ticket_issued_for?.name}
                      </td>
                      <td>
                        {
                          item.ticket_status_name === "issued" && !item.ticket_used_datetime &&
                          <Style.ButtonPrimary onClick={()=>btnuseTicket(item)}>
                            Tandai
                          </Style.ButtonPrimary>
                        }
                      </td>
                    </tr>
                  ))
                  :
                  <tr>
                    <td>Tidak Ada Data.</td>
                  </tr>
                }
              </Component.TableData>

              {/* table data */}

              <section>
                <Component.Pagination page={page} totalPage={lastPage} handleOnChange={btnPagination} />
              </section>


            </div>
        </div>
    </Component.Modal_Component>
  )
}