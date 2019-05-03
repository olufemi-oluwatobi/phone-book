import React, { Component } from "react";
import "./style.css";
import { Icon } from "antd";
import ContactList from "../contactItems";
import Modal from "../modal";
import update from "immutability-helper";

//give local db a unique name
const LOCAL_STORE = "phonebook_contacts_321";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      open: false,
      fields: {},
      displayContacts: [],
      currentContact: {},
      hasUpdated: false,
      editMode: false
    };
  }
  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.updateLocalStorageAndDisplay();
    }
  }
  updateLocalStorageAndDisplay() {
    this.setState({
      displayContacts: this.state.contacts,
      hasUpdated: false
    });
    localStorage.setItem(LOCAL_STORE, JSON.stringify(this.state.contacts));
  }

  hydrateStateWithLocalStorage() {
    if (localStorage.hasOwnProperty(LOCAL_STORE)) {
      let value = localStorage.getItem(LOCAL_STORE);
      try {
        value = JSON.parse(value);
        this.setState({ contacts: value });
      } catch (e) {
        console.log("e", e);
      }
    } else {
      console.log("cannot find key");
    }
  }

  showModal() {
    this.setState({ open: true });
  }

  hideModal() {
    this.setState({ open: false });
  }

  triggerEdit = id => {
    const contactDetails = this.filterContact(id);

    this.setState({
      fields: contactDetails,
      editMode: true,
      open: true
    });
  };

  handleInputChange = event => {
    const {
      dataset: { key },
      value
    } = event.target;
    let [segment, property] = key.split("-");

    if (!property) {
      property = segment;
      segment = "data";
    }

    this.setState(
      update(this.state, {
        fields: {
          $merge: {
            [property]: value
          }
        }
      })
    );
  };

  filterContact = id => {
    const { contacts } = this.state;
    return contacts.filter(contact => contact.id === id)[0];
  };

  displayContact = id => {
    const currentContact = this.filterContact(id);
    this.setState({ currentContact, editMode: true });
  };

  handleSubmit() {
    const { fields, contacts } = this.state;

    const formData = { id: contacts.length + 1, ...fields };
    this.setState(
      update(this.state, {
        contacts: {
          $push: [formData]
        }
      })
    );
    const check = this.state.contacts.filter(
      contact => formData.id === contact.id
    );

    if (check) {
      this.setState({ open: false, fields: {}, hasUpdated: true });
    }
  }

  handleUpdate() {
    const { fields, contacts } = this.state;
    const index = contacts.findIndex(contact => contact.id === fields.id);

    this.setState(
      update(this.state, {
        contacts: {
          [index]: {
            $set: fields
          }
        }
      })
    );
    const check = this.state.contacts.filter(
      contact => fields.id === contact.id
    );

    if (check) {
      this.setState({ open: false, fields: {}, hasUpdated: true });
    }
  }

  handleSearch = event => {
    const { value } = event.target;

    const { contacts } = this.state;
    const searchQuery = value.toLowerCase();
    const displayContacts = contacts.filter(contact => {
      let searchVal = contact.firstname.toLowerCase();

      return searchVal.indexOf(searchQuery) !== -1;
    });
    this.setState({
      displayContacts
    });
  };

  render() {
    return (
      <div className="contact_container">
        <div className="contact_list">
          <header className="list_header">
            <span>
              <span className="name">My contacts</span>
              <input
                placeholder="   search first name"
                onChange={e => this.handleSearch(e)}
                enterButton
              />
            </span>
            <div
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => this.showModal()}
            >
              <Icon type="plus" style={{ color: "black" }} />
            </div>
          </header>
          <ContactList
            data={this.state.displayContacts}
            triggerEdit={this.triggerEdit}
          />

          <Modal
            show={this.state.open}
            handleClose={() => this.hideModal()}
            fields={this.state.fields}
            changeFunction={this.handleInputChange}
            submitFunction={() => this.handleSubmit()}
            errors={this.state.errors}
            editMode={this.state.editMode}
            updateFunction={() => this.handleUpdate()}
          />
        </div>
      </div>
    );
  }
}

export default ContactPage;
