import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {

  
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // Error is of type `ErrorResponse`
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    // Error is an instance of the `Error` class
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    // Error is a string (e.g., custom error message)
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div id="error-page" className="flex flex-col gap-8 justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-slate-400">
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
