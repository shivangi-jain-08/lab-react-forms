import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forms = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [formErr, setFormErr] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);

    let errors = validate(formData);
    setFormErr(errors);

    let errKeyArray = Object.keys(errors);

    if (errKeyArray.length === 0) {
      toast("Form Submitted");
      setFormSubmit(true);
    } else {
      setFormSubmit(false);
    }
  };

  const validate = (data) => {
    let error = {};

    if (data.firstName.trim() === "") {
      error.firstName = "Please enter your first name";
    }
    if (data.lastName.trim() === "") {
      error.lastName = "Please enter your last name";
    }
    if (data.email.trim() === "") {
      error.email = "Please enter your email";
    }

    if (data.mobile.trim() === "") {
      error.mobile = "Please enter your mobile number";
    } else if (data.mobile.trim().length !== 10) {
      error.mobile = "Please enter a 10-digit mobile number";
    }

    console.log("error:", error);

    return error;
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <fieldset>
        <legend>Fill this form</legend>
        <form onSubmit={formSubmitHandler}>
          {formSubmit && (
            <div className="success">
              <p className="success-message">Registration Successful</p>
            </div>
          )}

          <label> First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={onInputChange}
          />
          {formErr.firstName && <p className="err">{formErr.firstName}</p>}

          <label> Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={onInputChange}
          />
          {formErr.lastName && <p className="err">{formErr.lastName}</p>}

          <label> Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email-address"
            onChange={onInputChange}
          />
          {formErr.email && <p className="err">{formErr.email}</p>}

          <label> Mobile number:</label>
          <input
            type="number"
            name="mobile"
            placeholder="Mobile number"
            onChange={onInputChange}
          />
          {formErr.mobile && <p className="err">{formErr.mobile}</p>}

          <input type="submit" value={"R E G I S T E R"} />
        </form>
      </fieldset>
    </div>
  );
};

export default Forms;
