import { Col, Row } from "antd";
import { useFormik } from "formik";
import { signIn } from "../../services/user.service";
import { InputWithLabel } from "../components/input";
import { useNavigate } from "react-router-dom";

/**
 * Sau khi đăng ký thành công, thì chuyển người dùng sang trang login
 * Làm tính năng login và log ra dữ liệu access_token
 */

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      signIn(values)
        .then((resp) => {
          formik.resetForm();

          localStorage.setItem("access_token", resp.content.accessToken);

          // Đăng nhập thành công
          // ....
          // Chuyển về trang home
          navigate("/profile");
        })
        .catch((e) => {
          console.log(e);
          // call api log lỗi
        });
    },
  });

  // type TK = keyof (typeof formik.touched);

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-[110rem] mx-auto">
      <Row className="mt-4" gutter={10}>
        <Col xs={24} sm={24}>
          <InputWithLabel
            {...formik.getFieldProps("email")}
            label={"Email:"}
            placeholder="example: example@gmail.com"
          />
        </Col>
      </Row>
      <Row className="mt-4" gutter={10}>
        <Col xs={24} sm={24}>
          <InputWithLabel
            {...formik.getFieldProps("password")}
            label={"Password"}
            placeholder=""
          />
        </Col>
      </Row>

      <button type="submit">Login</button>
    </form>
  );
}
