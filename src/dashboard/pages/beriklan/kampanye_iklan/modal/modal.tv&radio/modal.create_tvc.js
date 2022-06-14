import React, {useState, useEffect, useContext} from 'react';
import {Modal,Table} from "react-bootstrap";
import styled from "styled-components";
import {COLOR_PRIMARY,ButtonPrimary, COLOR_SECONDARY} from "../../../../../../component/style/content/default";
import {AlertError,AlertSuccess} from "../../../../../../component";
import {FormatCurrency} from "../../../../../../util";
import {api_kampanye_iklan} from "../../../../../../service/api";
import {Context} from "../../../../../../service";
import moment from "moment"

export const Modal_create_tvc = (props) => {
  const [data, setData] = useState({});
  const [loading_files, setLoading_files] = useState(false);
  const [file, setFile] = useState({});
  const {selected_company,data_input_tvc, data_user,product_id} = useContext(Context);
  const [checked_syarat, setChecked_syarat] = useState(false);
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    if(props.show){
      setData(props.props)
    }
  },[props.show])


  const handleOnChangeFile =(e) =>{
    setLoading_files(true)
    api_kampanye_iklan.post_storage_Server({file:e.target.files[0]})
    .then(res =>{
      console.log({post_storage_Server:res})
      if(res.status){
        setFile(state=>({...state, name:e.target.files[0].name, format:res.data.content_type, duration:res.data.duration, url:res.data.url }))
      }
      setLoading_files(false)
    })
  }


  const btnBuatKampanye = () =>{
    setLoading(true)
    const body ={
      campaign_name: data_input_tvc.nama_iklan,
      company_id: selected_company.value,
      deduct_mode: "FULL_BALANCE",
      end_date: moment(data_input_tvc.end_date).format('YYYY-MM-DD'),
      // event_id: null,
      // microsite_id: null,
      product_id: product_id,
      start_date: moment(data_input_tvc.from_date).format("YYYY-MM-DD"),
      tvc:{
        display_category_id: data_input_tvc.selected_cat_spot?.value,
        file_content: file.url,
        file_duration: file.duration,
        price_category_id: data_input_tvc.selected_cat_price?.value,
        program_id: data.selected_program?.map(item=> item.schedule_id),
        schedule_detail_id: data.selected_program?.map(item=> item.schedule_detail_id),
      },
      user_id: data_user.id
    }

    api_kampanye_iklan.post_campaign_tvc(body)
    .then(async res =>{
      if(res?.success){
        await AlertSuccess({title:"ERROR", text:res.success})
        window.location.reload()
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
      console.log({post_campaign_tvc:res})
      setLoading(false)
    })
  }
  
  return (
    <Modal show={props.show} onHide={props.onHide} fullscreen>
      <Modal.Body>
        <Container className="container">
            <div className="header">
              <h4 className="title">Upload Konten</h4>
              <span className="sub-title">Upload media file untuk ditayangkan pada iklan TVC anda</span>
            </div>

            <div className="content">

              <div className="form table-program">
                  <h5 className="title">Slot Terpilih</h5>

                  <div className="table-data">
                    <Table hover borderless>
                      <thead  className="text-center" style={{borderBottom:"2px solid #ccc !important"}}>
                        <tr>
                          <th>No.</th>
                          <th>Kategori</th>
                          <th>Tanggal</th>
                          <th>Jam Tayang</th>
                          <th>Program</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                          data.selected_program?.map((item,idx)=>(
                            <tr>
                              <td>{idx+1}</td>
                              <td>{`${item.display_category}`}</td>
                              <td>{`${item.date}`}</td>
                              <td>{`${item.start_time} - ${item.end_time}`}</td>
                              <td>{`${item.program}`}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </div>
              </div>

              <div className="wrap-content-biaya mt-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form upload-content">
                        <h5 className="title">Upload Konten</h5>

                        {
                          loading_files ? "Loading . . ." :
                          
                          <div>
                            <input type="file" accept='video/*'  name="" id="" className='form-control' onChange={handleOnChangeFile} />
                          </div>
                        }
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form total-biaya">
                        <h5 className="title">Upload Konten</h5>
                        <div>{`${data.selected_program?.length} slot x ${FormatCurrency.input(data.data?.pricebook?.publish_price)} = ${FormatCurrency.currency(data.totalharga)}`}</div>
                    </div>
                  </div>
                </div>
              </div>

              {
                file.url &&
                  <div className="form wrap-video">
                    <h5 className="title_konten_file">
                      Konten File
                    </h5>

                    <div className="table_content">
                      <div className="table-header">
                        <div>nama File</div>
                        <div>Format</div>
                        <div>Durasi</div>
                      </div>
                      <div className="table-content">
                        <div>{file.name}</div>
                        <div>{file.format}</div>
                        <div>{file.duration}</div>
                      </div>
                    </div>

                    <div className="pratinjau mt-5">
                      <h5 className="title">
                        Pratinjau
                      </h5>

                      <video style={{width:"100%"}}  height="500" controls>
                        <source src={file.url} type="video/mp4" />
                      </video>
                    </div>
                  </div>
              }

              <div className="wrap-syarat">
                <input type="checkbox" name="" id="syarat" className="form-check-input" checked={checked_syarat} onChange={e=>setChecked_syarat(e.target.checked)} />
                <label htmlFor="syarat">
                Saya menyetujui syarat dan ketentuan yang berlaku di website Mediacartz. <br />
                  <i>
                  Atas setiap kampanye yang dibuat oleh pengguna menggunakan produk atau layanan ini, pengguna dilarang untuk mempergunakan kata-kata, komentar, gambar atau konten apapun yang mengandung unsur SARA, diskriminasi, merendahkan atau menyudutkan pihak lain, vulgar, bersifat ancaman, atau hal-hal lain yang dapat dianggap tidak sesuai dengan nilai dan norma sosial.
                  </i>
                </label>
              </div>


              <div className="wrap-button">
                <div className="btn border" onClick={()=>props.onHide()}>Kembali</div>
                {
                  checked_syarat &&
                  <ButtonPrimary onClick={loading ? null:()=>btnBuatKampanye()}>{loading ? "Loading ..." : "Buat Kampanye"}</ButtonPrimary>
                }
              </div>

            </div>
        </Container>
      </Modal.Body>
    </Modal>
  )
};


const Container = styled.div `


.content{
  margin-top:20px;


  .wrap-button{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:20px;
  }


  .wrap-syarat{
    border-top:thin solid #ccc;
    margin-top:50px;
    padding-top:10px;
    display:flex;

    input{
      width:35px;
      height:15px;
      margin-right:10px;
    }
  }

  .form.wrap-video{
    margin-top:20px;

    .table_content{
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;

      .table-content{
        display:flex;
        align-items:center;
        justify-content:space-evenly;
        width:100%;
      }
      .table-header{
        display:flex;
        align-items:center;
        justify-content:space-evenly;
        width:100%;
        border-bottom:2px solid #ccc;
      }
    }

    .title_konten_file{
      color:${COLOR_SECONDARY};
    }
  }

  .form.table-program{
    .table-data{
    }
  }
}

.title{
  color:${COLOR_SECONDARY}
}
.form{
    padding:10px;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
}

.header{

.title{
  color:${COLOR_PRIMARY}
}
}
`
