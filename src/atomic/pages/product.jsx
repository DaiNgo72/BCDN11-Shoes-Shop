import { Button, Table } from "antd";
import { useStore } from "../../store/store";

const useColumns = () => {
  const [, { createStudent, updateStudent, deleteStudent }] = useStore();

  return [
    {
      title: "Mã SV",
      key: "msv",
      dataIndex: "msv",
      sorter: true,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",

      render: (value) => {
        return <>{value.toUpperCase()}</>;
      },
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "",
      key: "action",
      render: (value, record) => {
        return (
          <div className="flex gap-4">
            <Button type="primary">edit</Button>
            <Button type="primary" onClick={() => deleteStudent(record.msv)}>
              delete
            </Button>
          </div>
        );
      },
    },
  ];
};

export function Product() {
  // Lên StoreContext lấy dữ liệu về.
  const [{ students }] = useStore();
  const columns = useColumns();

  return (
    <>
      <Table pagination={false} columns={columns} dataSource={students} />
    </>
  );
}
