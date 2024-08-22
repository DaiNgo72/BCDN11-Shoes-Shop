import { Col, Row } from "antd";
import { useFormik } from "formik";
import * as Y from "yup";
import { InputWithLabel } from "../components/input";
import { RadioGroup } from "../components/radio";
import { signUp } from "../../services/user.service";
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";

const schema = Y.object({
    name: Y.string()
        .matches(/^[A-Z a-z]+$/, "2")
        .required("1"),

    email: Y.string().email("2").required("1"),

    password: Y.string()

        .required("1")
        .min(8, '2')
        .matches(/[a-zA-Z]/, '3')
        .matches(/\d/, '4')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, '5'),

    confirmPassword: Y.string()
        .required("1")
        // @ts-ignore
        .oneOf([Y.ref('password'), null], '2'),

});

function ListError({ errors }: {
    errors:
    ({ value: string, key: string | number, type: "error" | 'idle' | "success" })[]
}) {
    return <>
        <ul>

            {errors.map(i => {
                return <li className={
                    classNames({
                        'text-red-500': i.type === 'error',
                        'text-lime-500': i.type === 'success',
                        'text-gray-400': i.type === 'idle',
                    })
                } key={i.key}>{i.value}</li>
            })}
        </ul>
    </>
}

function IIFE(cb: Function) {
    return cb();
}

type TKey = "email" | "name" | 'password' | 'confirmPassword';

type SchemaRequire = {
    value: string,
    key: string | number,
    errors: string[]
}

type TSchemaListRequire = Record<TKey, SchemaRequire[]>;

// function Navigate({ to }: {to: string}) {
//     const navigate = useNavigate();

//     navigate(to)
// }

export default function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
            phone: "",
            gender: '',
            confirmPassword: '',
        },

        // validationSchema: schema,

        validate: (values) => {
            schema.validate(values);
            // const errors = schema.validateSync(values)

            // console.log(errors);

            return {}
        },
        onSubmit: (values) => {
            console.log(values);
            const { confirmPassword, ...other } = values;
            const data = {
                ...other,
                gender: other.gender === 'male' ? true : false
            }

            signUp(data).then(resp => {
                formik.resetForm();

                navigate('/login');
            }).catch((e) => {
                console.log(e);
                // call api log lỗi
            })
        },
    });

    // type TK = keyof (typeof formik.touched);

    const schemaListRequire: TSchemaListRequire = {
        name: [
            { value: "Không được nhập số", key: 2, errors: ["1", "2"] },
            { value: "Bắt buộc", key: 1, errors: ["1"] },
        ],
        email: [
            { value: "Bắt buộc", key: 1, errors: ["1"] },
            { value: "Không đúng format của email", key: 2, errors: ["1", "2"] }
        ],
        password: [
            { value: "Bắt buộc", key: 1, errors: ["1"] },
            { value: "Ít nhất 8 ký tự", key: 2, errors: ["1", "2"] },
            { value: "Có 1 ký tự in hoa", key: 3, errors: ["1", "3"] },
            { value: "Có 1 ký tự số", key: 4, errors: ["1", "4"] },
            { value: "Có 1 ký đặc biệt !@#$%^&*(),.?\":{}|<>", key: 5, errors: ["1", "5"] },
        ],
        confirmPassword: [
            { value: "Bắt buộc", key: 1, errors: ["1"] },
            { value: "Chưa khớp với password", key: 2, errors: ["1", "2"] },
        ]
    }

    const validateType = (key: TKey) => {
        return (item: SchemaRequire) => {
            return {
                ...item,
                // item.errors.includes(formik.errors.name || ''): kiểm tra có chứa lỗi hay không
                // !: phủ định
                // valid: !item.errors.includes(formik.errors.name || ''),

                // type: formik.touched.name ?
                //     item.errors.includes(formik.errors.name || '') ?
                //         'error' : 'success'
                //     : 'idle', // 'success', 'idle'


                type: IIFE(() => {
                    // formik.touched.name: true// đã từng chạm vào input
                    // false: chưa chạm
                    if (formik.touched[key]) {
                        // item.errors.includes(formik.errors['key'] || ''): true, có lỗi
                        // false: không có lỗi, thỏa mãn hết rồi.
                        if (item.errors.includes(formik.errors[key] || '')) {
                            return 'error'
                        }

                        return 'success'
                    }

                    return 'idle'
                })
            }
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-[110rem] mx-auto">
            <Row className="mt-4" gutter={10}>
                <Col xs={24} sm={12}>
                    <InputWithLabel
                        {...formik.getFieldProps("name")}
                        label={"Name"}
                        placeholder="exmaple: Nguyễn Văn A"
                    />

                    <ListError errors={schemaListRequire['name'].map(validateType('name'))} />

                </Col>

                <Col xs={24} sm={12}>
                    <InputWithLabel
                        {...formik.getFieldProps("email")}
                        label={"Email:"}
                        placeholder="example: example@gmail.com"
                    />

                    <ListError errors={schemaListRequire['email'].map(validateType('email'))} />

                </Col>

            </Row>

            <Row className="mt-4" gutter={10}>
                <Col xs={24} sm={12}>
                    <InputWithLabel
                        {...formik.getFieldProps("password")}
                        label={"Password"}
                        placeholder=""
                    />
                    <ListError errors={schemaListRequire['password'].map(validateType('password'))} />
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
                    <ListError errors={schemaListRequire['confirmPassword'].map(validateType('confirmPassword'))} />
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
