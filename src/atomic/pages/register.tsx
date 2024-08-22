import { Col, Row } from "antd";
import { useFormik } from "formik";
import * as Y from "yup";
import { InputWithLabel } from "../components/input";
import { RadioGroup } from "../components/radio";
import { signUp } from "../../services/user.service";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const schema = Y.object({
  name: Y.string()
    .matches(/^[A-Z a-z]+$/, "2")
    .required("1"),

  email: Y.string().email("2").required("1"),

  password: Y.string()

    .required("1")
    .min(8, "2")
    .matches(/[A-Z]/, "3")
    .matches(/\d/, "4")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "5"),

  confirmPassword: Y.string()
    .required("1")
    // @ts-ignore
    .oneOf([Y.ref("password"), null], "2"),
});

function ListError({
  errors,
}: {
  errors: {
    value: string;
    key: string | number;
    type: "error" | "idle" | "success";
  }[];
}) {
  return (
    <>
      <ul>
        {errors.map((i) => {
          return (
            <li
              className={classNames({
                "text-red-500": i.type === "error",
                "text-lime-500": i.type === "success",
                "text-gray-400": i.type === "idle",
              })}
              key={i.key}
            >
              {i.value}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function IIFE(cb: Function) {
  return cb();
}

type TKey = "email" | "name" | "password" | "confirmPassword";

type SchemaRequire = {
  value: string;
  key: string | number;
  errors?: string[];
  valid?: boolean;
};

type TSchemaListRequire = Record<TKey, SchemaRequire[]>;

// function Navigate({ to }: {to: string}) {
//     const navigate = useNavigate();

//     navigate(to)
// }

// typescript: build
// schema: yup, zod, : runtime

const usernameSchema = Y.string().min(2).required();

const responseSchema = Y.object({
  username: Y.string().required(),
  token: Y.string().required(),
});

// Từ schema có thể lấy được typescript
type ResponseSchema = Y.InferType<typeof responseSchema>;

// responseSchema.isValid(response);

/**
 * response: {
 *  username: 'fasjldkfjasd',
 *  token: 'fafasdf',
 * }
 * response.token
 *
 *
 *
 * response: {
 *  username: 'fasjldkfjasd',
 *  accessToken: 'fafasdf',
 * }
 *
 * response.token
 */

export default function Register() {
  const navigate = useNavigate();

  // ----------------
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      phone: "",
      gender: "",
      confirmPassword: "",
    },

    onSubmit: (values) => {
      // Validate
      if (!isFormValid(schemaListRequire)) return;

      console.log(values);
      const { confirmPassword, ...other } = values;
      const data = {
        ...other,
        gender: other.gender === "male" ? true : false,
      };

      signUp(data)
        .then((resp) => {
          formik.resetForm();

          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
          // call api log lỗi
        });
    },
  });

  const isFormValid = (schema: TSchemaListRequire) => {
    return Object.values(schema).every(isFieldValid);
  };

  const isFieldValid = (field: SchemaRequire[]) => {
    return field.every((i) => i.valid);
  };

  const schemaListRequire: TSchemaListRequire = {
    name: [
      {
        value: "Bắt buộc",
        key: 1,
        valid: Y.string().required().isValidSync(formik.values.name),
      },
      {
        value: "Không được nhập số",
        key: 2,
        valid: Y.string()
          .matches(/^[A-Z a-z]+$/)
          .isValidSync(formik.values.name),
      },
    ],
    email: [
      {
        value: "Bắt buộc",
        key: 1,
        valid: Y.string().required().isValidSync(formik.values.email),
      },
      {
        value: "Không đúng format của email",
        key: 2,
        valid: Y.string().email().required().isValidSync(formik.values.email),
      },
    ],
    password: [
      {
        value: "Bắt buộc",
        key: 1,
        valid: Y.string().required().isValidSync(formik.values.password),
      },
      {
        value: "Ít nhất 8 ký tự",
        key: 2,
        valid: Y.string().min(8).required().isValidSync(formik.values.password),
      },
      {
        value: "Có 1 ký tự in hoa",
        key: 3,
        valid: Y.string()
          .matches(/[A-Z]/)
          .required()
          .isValidSync(formik.values.password),
      },
      {
        value: "Có 1 ký tự số",
        key: 4,
        valid: Y.string()
          .matches(/\d/)
          .required()
          .isValidSync(formik.values.password),
      },
      {
        value: 'Có 1 ký đặc biệt !@#$%^&*(),.?":{}|<>',
        key: 5,
        valid: Y.string()
          .matches(/[!@#$%^&*(),.?":{}|<>]/, "5")
          .required()
          .isValidSync(formik.values.password),
      },
    ],
    confirmPassword: [
      {
        value: "Bắt buộc",
        key: 1,
        valid: Y.string().required().isValidSync(formik.values.confirmPassword),
      },
      {
        value: "Khớp password",
        key: 2,
        valid:
          Y.string().required().isValidSync(formik.values.password) &&
          formik.values.confirmPassword === formik.values.password,
      },
    ],
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-[110rem] mx-auto">
      <Row className="mt-4" gutter={10}>
        <Col xs={24} sm={12}>
          <InputWithLabel
            {...formik.getFieldProps("name")}
            label={"Name"}
            placeholder="exmaple: Nguyễn Văn A"
          />

          {/* <ListError
            errors={schemaListRequire["name"].map(validateType("name"))}
          /> */}

          <ul>
            {schemaListRequire.name.map((i) => {
              return (
                <li
                  key={i.key}
                  style={{
                    color: i.valid ? "green" : "gray",
                  }}
                >
                  {i.value}
                </li>
              );
            })}
          </ul>
        </Col>

        <Col xs={24} sm={12}>
          <InputWithLabel
            {...formik.getFieldProps("email")}
            label={"Email:"}
            placeholder="example: example@gmail.com"
          />

          {/* <ListError
            errors={schemaListRequire["email"].map(validateType("email"))}
          /> */}

          <ul>
            {schemaListRequire.email.map((i) => {
              return (
                <li
                  key={i.key}
                  style={{
                    color: i.valid ? "green" : "gray",
                  }}
                >
                  {i.value}
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>

      <Row className="mt-4" gutter={10}>
        <Col xs={24} sm={12}>
          <InputWithLabel
            {...formik.getFieldProps("password")}
            label={"Password"}
            placeholder=""
          />
          <ul>
            {schemaListRequire.password.map((i) => {
              return (
                <li
                  key={i.key}
                  style={{
                    color: i.valid ? "green" : "gray",
                  }}
                >
                  {i.value}
                </li>
              );
            })}
          </ul>
        </Col>

        <Col xs={24} sm={12}>
          <InputWithLabel
            {...formik.getFieldProps("phone")}
            label={"Phone"}
            placeholder="example: +84 123456789"
          />
        </Col>
      </Row>

      <Row className="mt-4" gutter={10}>
        <Col xs={24} sm={12}>
          <InputWithLabel
            {...formik.getFieldProps("confirmPassword")}
            label={"Password confirm"}
            placeholder=""
          />
          <ul>
            {schemaListRequire.confirmPassword.map((i) => {
              return (
                <li
                  key={i.key}
                  style={{
                    color: i.valid ? "green" : "gray",
                  }}
                >
                  {i.value}
                </li>
              );
            })}
          </ul>
        </Col>

        <Col xs={24} sm={12}>
          <RadioGroup
            {...formik.getFieldProps("gender")}
            data={[
              {
                label: "Male",
                unique: "male",
              },
              {
                label: "female",
                unique: "female",
              },
            ]}
          />
        </Col>
      </Row>

      <button type="submit">Submit</button>
    </form>
  );
}
