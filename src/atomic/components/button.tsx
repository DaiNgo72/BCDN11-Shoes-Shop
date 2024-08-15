/**
 * props:
 * handleSubmit: function có tham số id là string
 * text: string
 * 
 * người sử dụng có thể ghi đè style của component của các bạn
 * 
 * 
 */

import { ReactNode } from "react"
import type { PropsWithChildren } from "react"

type Props = ComponentWithStyleG<{
    handleSubmit: (id: string) => void,
}> & PropsWithChildren;

function Button({ children, handleSubmit, className }: Props) {

    return <>
        <button
            onClick={() => handleSubmit('1')}
            className={"bg-lime-600 text-red-50 p-10 rounded " + className}
        >
            {children}
        </button>
    </>
}

{/* <Button className='bg-red-500'></Button> */ }
type AvatarProps = {} & ComponentWithStyle;

function Avatar({ className }: AvatarProps) {

    return <>
        <div
            className={"bg-lime-600 text-red-50 p-10 rounded " + className}
        >
        </div>
    </>
}

type ComponentWithStyle = {
    className?: string;
}

type ComponentWithStyleG<T> = {
    className?: string;
} & T
