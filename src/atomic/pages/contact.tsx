import { isRouteErrorResponse, useLoaderData, useRouteError } from "react-router-dom";

export async function loader({ request }) {
    return fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json());
  }
  
  export function Component() {
    let data = useLoaderData();
  
    return (
      <>
        <h1>You made it!</h1>
        <p>{data}</p>
      </>
    );
  }
  
  // If you want to customize the component display name in React dev tools:
  Component.displayName = "SampleLazyRoute";
  
  export function ErrorBoundary() {
    let error = useRouteError();
    return isRouteErrorResponse(error) ? (
      <h1>
        {error.status} {error.statusText}
      </h1>
    ) : (
      <h1>{error.message || error}</h1>
    );
  }
  
  // If you want to customize the component display name in React dev tools:
  ErrorBoundary.displayName = "SampleErrorBoundary";
