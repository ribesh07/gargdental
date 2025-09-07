import { NextResponse } from 'next/server';

// import { hostname } from '#/utils/constants';
//Unauthorized Error need to fix

const hostnameEnv = process.env.NEXT_PUBLIC_HOSTNAME;
const hostname = hostnameEnv ? hostnameEnv : 'http://localhost:3000';
const USERID = process.env.CONNECTIPS_MERCHAND_USER_ID;
const PASSWORD = process.env.CONNECTIPS_AUTH_PASSWORD;
const VALADIATION_URL = process.env.CONNECTIPS_VALIDATION_API_URL;
const MERCHANTID = process.env.NEXT_PUBLIC_CONNECTIPS_MERCHANTID;
const APPID = process.env.NEXT_PUBLIC_CONNECTIPS_APPID;
const DETAILS_URL = process.env.NEXT_PUBLIC_CONNECTIPS_GETDETAILS_URL;


// const credentials = Buffer.from(`User Id: ${Mer} Password: ${pass}`).toString("base64");
const credentials = Buffer.from(`${APPID}:${PASSWORD}`).toString("base64");


export async function POST(request: Request) {
  try {
    const body = await request.json();
    body.REFERENCEID = String(body.REFERENCEID);
    body.APPID = APPID;
    body.TXNAMT = Number(body.TXNAMT);
    body.MERCHANTID = Number(MERCHANTID);

    console.log('Request Body:', body);

    const tokenResponse = await fetch(`${hostname}/connectips/get_token`, {
      method: 'POST',
      body: JSON.stringify({
        MERCHANTID: body.MERCHANTID,
        APPID: body.APPID,
        REFERENCEID: body.REFERENCEID,
        TXNAMT: body.TXNAMT,
      }),
      cache: 'no-cache',
    });
    

    if (!tokenResponse.ok) {
      throw new Error('Token Error');
    }

    const { TOKEN } = await tokenResponse.json();

    const payload = {
        merchantId: Number(MERCHANTID),          
        appId: APPID,                           
        referenceId: String(body.REFERENCEID),   
        txnAmt: Number(body.TXNAMT),            
        token: TOKEN,
      };

    console.log('Payload:', payload);
    console.log('Validation URL:', VALADIATION_URL);

    
    const responseDetails = await fetch(DETAILS_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-cache',
    });

    // console.log('Response Details Status:', responseDetails);


    if (!responseDetails.ok) {
      throw new Error('Validate Error');
    }
    const data = await responseDetails.json();
    console.log('Details Response:', data);

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 'ERROR',
      statusDesc: 'Internal Error',
    });
  }
}
