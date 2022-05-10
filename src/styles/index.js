import React from "react"
export const customButtonStyle = (
  <style type="text/css">
    {`
        .btn-custom {
          background-color: #cccccc;
          border: 2px solid #cccccc;
          border-radius: 10px;
          color: #3378ac;
          cursor: pointer;
          display: inline-block;
          font-family: Arial;
          font-size: 14px;
          font-weight: 600;
          height: 26px;
          margin: 10px;
          padding: 1px 15px;
          text-align: center;
          text-decoration: none;
          -webkit-appearance: none;
        }
        .btn-custom:hover {
          background-color: #fff;
          border-radius: 10px;
          color: #c00;
          -webkit-appearance: none;
        }
        .btn-custom:focus {
          box-shadow: none;
        }
        `}
  </style>
)
