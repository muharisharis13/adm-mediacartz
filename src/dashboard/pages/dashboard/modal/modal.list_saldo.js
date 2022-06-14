import React, { useState, useEffect } from "react";
import {
  Modal_Component,
  Pagination,
  LoadingIcon,
} from "../../../../component";
import PropTypes from "prop-types";
import { DashboardService } from "../../../../service/api";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { FormatCurrency, Moment, Numeric } from "../../../../util";

export const Modal_list_saldo = (props) => {
  const { company } = props.props;
  const [data, setData] = useState({
    balance: 0,
    list_balance: {
      data: [],
      page: 1,
      last_page: 1,
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.show) {
      if (company !== null) {
        setLoading(true);
        DashboardService.get_balance(company?.company_id).then((res) => {
          if (res?.success) {
            setData((state) => ({ ...state, balance: res.data }));
          }
        });

        DashboardService.get_balance_list({
          company_id: company?.company_id,
          page: data.list_balance?.page,
        }).then((res) => {
          if (res?.success) {
            setLoading(false);
            setData((state) => ({
              ...state,
              list_balance: {
                data: res.data,
                page: res.page,
                last_page: res.last_page,
              },
            }));
          }
        });
      }
    }
  }, [props.show]);

  const btnHandlePagination = (e) => {
    setLoading(true);
    DashboardService.get_balance_list({
      company_id: company?.company_id,
      page: e.selected + 1,
    }).then((res) => {
      if (res?.success) {
        setData((state) => ({
          ...state,
          list_balance: {
            data: res.data,
            page: res.page,
            last_page: res.last_page,
          },
        }));
        setLoading(false);
      }
    });
  };

  const btnOnClose = () => {
    props.onHide();
    setData({
      balance: 0,
      list_balance: {
        data: [],
        page: 1,
        last_page: 1,
      },
    });
  };

  return (
    <Modal_Component
      show={props.show}
      onHide={btnOnClose}
      title={`saldo`}
      size="xl"
    >
      <Container>
        <div className="section-1">
          <div className="text-title">Saldo Saat Ini</div>
          <h3>{FormatCurrency.currency(222222)}</h3>
        </div>

        <div className="section-2 mt-5">
          <div className="text-title">Riwayat Saldo</div>
          <Table hover responsive bordered striped>
            <thead>
              <tr>
                <td>No</td>
                <td>Tanggal</td>
                <td>Deskripsi</td>
                <td>Debit</td>
                <td>Credit</td>
                <td>Saldo</td>
                <td>Referensi</td>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                data.list_balance?.data?.map((item, idx) => (
                  <tr key={idx}>
                    <td
                      data-label="No."
                      className="has-text-weight-bold has-text-centered"
                    >
                      {Numeric({ idx: idx, page: data?.list_balance?.page })}
                    </td>
                    <td data-label="Tanggal" className="has-text-centered">
                      {Moment(item.balance_history_datetime)}
                    </td>
                    <td data-label="Deskripsi" className="has-text-centered">
                      {item.balance_history_description}
                    </td>
                    <td data-label="Debit" className="has-text-centered">
                      {item.balance_history_debit
                        ? FormatCurrency.currency(item.balance_history_debit)
                        : "-"}
                    </td>
                    <td data-label="Credit" className="has-text-centered">
                      {item.balance_history_credit
                        ? FormatCurrency.currency(item.balance_history_credit)
                        : "-"}
                    </td>
                    <td data-label="Saldo" className="has-text-centered">
                      {FormatCurrency.currency(item.balance_history_balance)}
                    </td>
                    <td data-label="Referensi" className="has-text-centered">
                      {item.ms_reference
                        ? item.ms_reference.ms_reference_name +
                          " #" +
                          item.reference_source_id
                        : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <LoadingIcon />
              )}
            </tbody>
          </Table>

          <section>
            <Pagination
              totalPage={data?.list_balance.last_page}
              page={data?.list_balance.page}
              handleOnChange={btnHandlePagination}
            />
          </section>
        </div>
      </Container>
    </Modal_Component>
  );
};

const Container = styled.div``;

Modal_list_saldo.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.string,
};
