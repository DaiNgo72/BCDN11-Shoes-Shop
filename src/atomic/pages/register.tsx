import { Col, Row } from "antd";
import { useFormik } from "formik";
import * as Y from "yup";
import { InputWithLabel } from "../components/input";
import { RadioGroup } from "../components/radio";
import { signUp } from "../../services/user.service";

const phoneRegExp = /^(\+84|0)[1234567890]\d{8,9}$/;

const schema = Y.object({
    name: Y.string()
        .matches(/^[A-Z a-z]+$/, "2")
        .required("1"),

    phone: Y.string()
        .matches(phoneRegExp, "Số điện thoại không hợp lệ")
        .required("Bắt buộc"),

    email: Y.string().email("Email không hợp lệ").required("Bắt buộc"),

    password: Y.string()
        .matches(phoneRegExp, "Số điện thoại không hợp lệ")
        .required("Bắt buộc"),

    confirmPassword: Y.string()
        .matches(phoneRegExp, "Số điện thoại không hợp lệ")
        .required("Bắt buộc"),

    gender: Y.string().required()
});

function ListError({ errors }: { errors: ({ value: string, key: string | number })[] }) {
    return <>
        <ul>

            {errors.map(i => {
                return <li key={i.key}>{i.value} x | v</li>
            })}
        </ul>
    </>
}

export default function Register() {
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
            phone: "",
            gender: '',
            confirmPassword: '',
        },

        validationSchema: schema,

        onSubmit: (values) => {
            const { confirmPassword, ...other } = values;
            const data = {
                ...other,
                gender: other.gender === 'male' ? true : false
            }

            signUp(data).then(resp => {
                formik.resetForm();
            }).catch((e) => {
                console.log(e);
                // call api log lỗi
            })
        },
    });

    const schemaListRequire = {
        name: [
            { value: "Bắt buộc", key: 1 },
            { value: "Không được nhập số", key: 2 }
        ],
        email: [
            { value: "Bắt buộc", key: 1 },
            { value: "Không được nhập số", key: 2 }
        ],
        password: [
            { value: "Bắt buộc", key: 1 },
            { value: "Có 1 ký tự in hoa", key: 2 },
            { value: "Ít nhất 6 ký tự", key: 3 }
        ]
    }

    console.log(formik.errors.name)

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-[110rem] mx-auto">
            <Row className="mt-4" gutter={10}>
                <Col xs={24} sm={12}>
                    <InputWithLabel
                        {...formik.getFieldProps("name")}
                        label={"Name"}
                        placeholder="exmaple: Nguyễn Văn A"
                    />

                    <ListError errors={schemaListRequire['name']} />

                </Col>

                <Col xs={24} sm={12}>
                    <InputWithLabel
                        {...formik.getFieldProps("email")}
                        label={"Email:"}
                        placeholder="example: example@gmail.com"
                    />

                    <ListError errors={schemaListRequire['email']} />

                </Col>

            </Row>

            <Row className="mt-4" gutter={10}>
                <Col xs={24} sm={12}>
                    <InputWithLabel
                        {...formik.getFieldProps("password")}
                        label={"Password"}
                        placeholder=""
                    />
                    <ListError errors={schemaListRequire['password']} />
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
                </Col>

                <Col xs={24} sm={12}>
                    <RadioGroup {...formik.getFieldProps("gender")} data={[
                        {
                            label: 'Male',
                            unique: 'male'
                        },
                        {
                            label: 'female',
                            unique: 'female'
                        }
                    ]} />
                </Col>
            </Row>

            <button type="submit">Submit</button>
        </form>
    );
}
