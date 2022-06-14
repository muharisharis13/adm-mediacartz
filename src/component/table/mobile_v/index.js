import {
  ContainerContent,
  ContainerHeader,
  ContainerTabelMobile,
} from "./style";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const Table_Mobile_v = ({ header, content }) => {
  return (
    <ContainerTabelMobile>
      <ContainerHeader>{header}</ContainerHeader>
      <ContainerContent>{content}</ContainerContent>
    </ContainerTabelMobile>
  );
};

export const TableData = (props) => {
  return (
    <Table className="table table-responsive">
      <thead>
        <tr>
          {props.header?.map((item, idx) => (
            <th key={idx}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  thead {
    border-bottom: 2px solid #ddd !important;
  }

  td,
  th {
    padding: 12px 15px;
    /* border: 1px solid #ddd; */
    text-align: center;
    font-size: 15px;
  }

  th {
    background-color: transparent;
    color: #acacb7;
    font-weight: 600;
  }

  tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  /*responsive*/

  @media (max-width: 500px) {
    thead {
      display: none;
    }

    tbody,
    tr,
    td {
      display: block;
      width: 100%;
    }
    tr {
      margin-bottom: 15px;
    }
    td {
      text-align: right;
      padding-left: 50%;
      text-align: right;
      position: relative;
      flex-wrap: wrap;
      word-break: break-all;
    }
    td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 15px;
      flex-wrap: wrap;
      word-break: break-all;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
    }
  }
`;

TableData.propTypes = {
  header: PropTypes.array.isRequired,
  children: PropTypes.any.isRequired,
};
