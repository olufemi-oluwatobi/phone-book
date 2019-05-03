import React from "react";
import { Input, Form } from "antd";
import "./styles.css";
const Modal = ({
  handleClose,
  show,
  changeFunction,
  blurFunction,
  submitFunction,
  fields,
  updateFunction,
  editMode
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <span className="closeButton" onClick={handleClose}>
          X
        </span>
        <Form>
          <section className="container__form">
            <div className="form_item">
              <label className="field_label" htmlFor="first_name">
                First name
              </label>

              <Input
                className="form_content"
                data-key="firstname"
                onChange={changeFunction}
                onBlur={blurFunction}
                value={fields.firstname}
                placeholder="first name"
                required={editMode ? false : true}
              />
            </div>
            <div className="form_item">
              <label className="field_label" htmlFor="last_name">
                Last name
              </label>
              <Input
                onChange={changeFunction}
                data-key="lastname"
                className="form_content"
                value={fields.lastname}
                placeholder="last name"
                required={editMode ? false : true}
              />
            </div>

            <div className="form_item">
              <label className="field_label" htmlFor="city">
                City
              </label>
              <Input
                onChange={changeFunction}
                className="form_content"
                data-key="city"
                value={fields.city}
                placeholder="city"
                required={editMode ? false : true}
              />
            </div>
            <div className="form_item">
              <label className="field_label" htmlFor="country">
                Country
              </label>
              <Input
                onChange={changeFunction}
                className="form_content"
                data-key="country"
                value={fields.country}
                placeholder="country"
                required={editMode ? false : true}
              />
            </div>
            <div className="form_item">
              <label className="field_label" htmlFor="phone_number">
                Number
              </label>
              <Input
                onChange={changeFunction}
                type="number"
                className="form_content"
                data-key="homeNumber"
                value={fields.homeNumber}
                placeholder="phone number"
                required={editMode ? false : true}
              />
            </div>
            <button
              className="form_button"
              onClick={editMode ? updateFunction : submitFunction}
            >
              {editMode ? "Update" : "Submit"}
            </button>
          </section>
        </Form>
      </section>
    </div>
  );
};
export default Modal;
