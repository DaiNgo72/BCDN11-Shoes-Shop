import { Col, Row } from "antd";
import { useFormik } from "formik";
import { InputWithLabel } from "../atoms/input";
import { useContext } from "react";

import * as Y from "yup";
import { useStore } from "../../store/store";

const phoneRegExp = /^(\+84|0)[1234567890]\d{8,9}$/;

const schema = Y.object({
  msv: Y.number().typeError("Chỉ được nhập số").required("Bắt buộc"),

  name: Y.string()
    .matches(/^[A-Z a-z]+$/, "Chỉ được nhập ký tự chữ")
    .required("Bắt buộc"),

  phone: Y.string("")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .required("Bắt buộc"),

  email: Y.string().email("Email không hợp lệ").required("Bắt buộc"),
});

export function Form() {
  const [, { createStudent }] = useStore();

  const formik = useFormik({
    initialValues: {
      msv: "",
      name: "",
      phone: "",
      email: "",
    },

    validationSchema: schema,

    onSubmit: (values) => {
      createStudent(values);

      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-[110rem] mx-auto">
      <Row>
        <Col span={24}>
          <InputWithLabel
            {...formik.getFieldProps("msv")}
            // label={"Mã SV:"}
            // placeholder="example: 123"
        
            
            
          />

          {/* {formik.touched.msv && formik.errors.msv && (
            <>
              <p className="text-red-500">{formik.errors.msv}</p>
            </>
          )} */}

          <ul>
            <li>
              1. Bắt buộc{" "}
              {formik.touched.msv && formik.errors.msv === "Bắt buộc"
                ? "X"
                : "V"}
            </li>
            <li>2. Số</li>
          </ul>
        </Col>
      </Row>

      <Row className="mt-4" gutter={10}>
        <Col xs={24} sm={12}>
          <InputWithLabel
            {...formik.getFieldProps("name")}
            label={"Họ và Tên:"}
            placeholder="exmaple: Nguyễn Văn A"
          />

          {formik.touched.name && formik.errors.name && (
            <>
              <p className="text-red-500">{formik.errors.name}</p>
            </>
          )}
        </Col>
        <Col xs={24} sm={12}>
          <InputWithLabel
            {...formik.getFieldProps("phone")}
            label={"Sđt:"}
            placeholder="example: +84 123456789"
          />

          {formik.touched.phone && formik.errors.phone && (
            <>
              <p className="text-red-500">{formik.errors.phone}</p>
            </>
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col span={24}>
          <InputWithLabel
            {...formik.getFieldProps("email")}
            label={"Email:"}
            placeholder="example: example@gmail.com"
          />

          {formik.touched.email && formik.errors.email && (
            <>
              <p className="text-red-500">{formik.errors.email}</p>
            </>
          )}
        </Col>
      </Row>

      <button type="submit">Submit</button>
    </form>
  );
}
