
export interface responseInterface {
  err?: {} | null;
  resCode: number;
  success: {};
  message: string;
  origin?: string;
}


let allowed_origins = [];

switch (process.env.STAGE) {
  case "local":
  case "dev":
    allowed_origins = [ "*"];
    break;
  case "qa":
    allowed_origins = ["https://taps-qa.dk.com"];
    break;
  case "prod":
    allowed_origins = ["https://taps.dk.com"];
    break;
  default:
    allowed_origins = [ "https://taps-dev.dk.com", "http://localhost:4200"];
    break;
}

export const sendResponseBody = ({
  err = null,
  resCode,
  success,
  message,
  origin = allowed_origins[0]
}: responseInterface) => {

  const headers = {
    'Access-Control-Allow-Origin': allowed_origins.includes(origin)
      ? origin
      : allowed_origins[0],
    'Access-Control-Allow-Credentials': true  
  };

  return {
    statusCode: resCode,
    headers,
    body: JSON.stringify(
      {
        message,
        response: err ? err : success,
      },
      null,
      2
    ),
  };
};


export async function internalServerError(error: any) {
  
  //if(process.env.STAGE !== 'prod'){
    console.log(error);
  //}
  
  let message = 'Internal server error';

  //Attempt to give a better response message
  if(error?.errors && error?.errors.length){
    message = `${error?.errors[0]?.message?.toUpperCase()}. Please check ${error?.errors[0]?.value}`  ;
  }
  
  return sendResponseBody({
    err: {
      type: Object.getPrototypeOf(error).constructor.name,
      message: Object.getPrototypeOf(error).constructor.message
    },
    resCode: 500,
    success: null,
    message: message,
  });
}

export async function badRequest(message: string) {
  return sendResponseBody({
    err: null,
    resCode: 400,
    success: null,
    message: message,
  });
}
