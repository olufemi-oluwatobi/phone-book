import React, { Component } from "react";
import "./styles.css";
import { Icon, Table } from "antd";

class ContactList extends Component {
  getContactInitials(name) {
    const nameArray = [...name];
    return nameArray[0].toUpperCase();
  }
  renderPlaceHolder() {
    return <div>no contact has been added, please add a contact</div>;
  }
  renderDataList() {
    const { triggerEdit } = this.props;
    const columns = [
      {
        title: "first name",
        dataIndex: "firstname",
        key: "firstname",
        width: "30%"
      },
      {
        title: "last name",
        dataIndex: "lastname",
        key: "lastname",
        width: "30%"
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        width: "15%"
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        width: "15%"
      },
      {
        title: "number",
        dataIndex: "homeNumber",
        key: "homeNumber"
      },

      {
        title: "",
        dataIndex: "id",
        key: "edit",
        render: id => {
          return (
            <span
              onClick={() => triggerEdit(id)}
              style={{ color: "red", padding: "20px", cursor: "pointer" }}
            >
              <Icon type="edit" />
            </span>
          );
        }
      }
    ];

    return <Table columns={columns} dataSource={this.props.data} />;
  }

  render() {
    const { clickFunction, data } = this.props;
    return (
      <div onClick={clickFunction} className="">
        {data.length > 0 ? this.renderDataList() : this.renderPlaceHolder()}
      </div>
    );
  }
}

export default ContactList;
