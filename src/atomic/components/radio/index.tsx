import { FieldInputProps } from "formik";
import { useId } from "react"

type RadioWithLabelProps = {
    label: string,
    unique: string | number
}

export function RadioWithLabel({ label, unique, ...fieldProps }: RadioWithLabelProps & FieldInputProps<any>) {
    const id = useId();

    return <>
        <input {...fieldProps} checked={unique === fieldProps.value} id={id} type="radio" value={unique} ></input>
        <label htmlFor={id}>{label}</label>
    </>
}
type RadioGroupProps = {
    data: (Omit<RadioWithLabelProps, 'name'>)[]
} & FieldInputProps<any>

export function RadioGroup({ data, ...fieldProps }: RadioGroupProps) {
    return <>
        {data.map(item => {
            return <RadioWithLabel {...fieldProps} key={item.unique} unique={item.unique} label={item.label} />
        })}
    </>
}
