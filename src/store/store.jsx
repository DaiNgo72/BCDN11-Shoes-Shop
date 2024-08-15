import { createContext, useContext, useState } from "react";

// Không được bao bọc bên trong context mà lấy giá trị về thì sẽ bị null
const StoreContext = createContext(null);

export const useStore = () => {
  return useContext(StoreContext);
};

export function Provider({ children }) {
  const [students, setStudents] = useState([]);

  console.log(students);

  const createStudent = (p) => {
    setStudents((c) => [...c, p]);
  };

  const updateStudent = (p) => {
    /**
     * 1. Tìm id của p trong products
     * 2. Cập nhật giá trị của product vừa tìm được.
     * 3. Set State Products.
     */

    const idx = students.findIndex((product) => product.id === p.id);
    if (idx === -1) return;
    students[idx] = { ...students[idx], ...p };

    setStudents([...students]);
  };

  const deleteStudent = (id) => {
    setStudents((students) => students.filter((s) => s.msv !== id));
  };

  const value = [
    { students: students }, //data
    { createStudent, updateStudent, deleteStudent }, // function
  ];

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
