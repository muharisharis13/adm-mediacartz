import React, { useCallback, useEffect, useState } from "react";
import { Modal_Component, Loadingfunc } from "component";
import {} from "component/";
import PropTypes from "prop-types";
import { ApiCustomer as api } from "../../../../service/api";
import { firstLetterUppercase, Moment } from "../../../../util";

const Detail = (props) => {
  const { show, onHide, params } = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await api.getDetailCustomer(params.id).then((res) => {
      if (res.success) {
        setData(res?.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (show) {
      getData();
    }
  }, [show]);

  const renderRow = useCallback(() => {
    return (
      <React.Fragment>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Nama</strong>
            </div>
            <div className="">{data?.name}</div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>MSISDN/Operator</strong>
            </div>
            <div className="">
              {data?.msisdn}/{data?.operator}
            </div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Email</strong>
            </div>
            <div className="">{data?.email}</div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Jenis Kelamin</strong>
            </div>
            <div className="">
              {data?.gender === "m" ? "Laki-Laki" : "Perempuan"}
            </div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Agama</strong>
            </div>
            <div className="">
              {firstLetterUppercase(data?.religion) || "-"}
            </div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Pekerjaan</strong>
            </div>
            <div className="">{firstLetterUppercase(data?.job) || "-"}</div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Tempat dan Tanggal Lahir</strong>
            </div>
            <div className="">
              {firstLetterUppercase(data?.birth_place)},{" "}
              {Moment(data?.birth_date)}
            </div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Alamat</strong>
            </div>
            <div className="">{data?.address || "-"}</div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Kota</strong>
            </div>
            <div className="">{firstLetterUppercase(data?.city) || "-"}</div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Perangkat</strong>
            </div>
            <div className="">{firstLetterUppercase(data?.device) || "-"}</div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>Perusahaan</strong>
            </div>
            <div className="">{data?.company?.company_name}</div>
          </div>
        </div>
        <div className="card p-1 border-bottom-1">
          <div className="d-flex">
            <div className=" w-50">
              <strong>dibuat Pada</strong>
            </div>
            <div className="">{Moment(data?.created_datetime)}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }, [getData]);
  return (
    <Modal_Component show={show} onHide={onHide} title={`Detail ${data?.name}`}>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <Loadingfunc />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12">{renderRow()}</div>
          </div>
        </div>
      )}
    </Modal_Component>
  );
};

export default Detail;

Detail.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  params: PropTypes.object,
};
