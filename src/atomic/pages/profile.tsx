import { useLoaderData } from "react-router-dom"

export function Profile() {
    const data = useLoaderData();

    // 

    return <>
        {JSON.stringify(data)}
    </>
}
