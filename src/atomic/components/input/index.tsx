import { Input } from "antd";
import { useId } from "react";

import type { InputProps } from 'antd';

type Props = {
    label: string;
} & InputProps;

export function InputWithLabel({ label, ...propsInputAntd }: Props) {
    const id = useId();

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <Input {...propsInputAntd} id={id} />
        </div>
    );
}
