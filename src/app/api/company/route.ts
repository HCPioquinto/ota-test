import { NextRequest } from "next/server";
import mockData from './mock'

let ctr = 0;
let data = [...mockData]

export async function GET(request: NextRequest) {
  ctr++;
  const url = request.nextUrl;
  const _page = url.searchParams.get('page')
  const _size = url.searchParams.get('size')

  const isValid = _page && _size;
  if (ctr === 4 || !isValid) {
    ctr = 0;
    const res = Response.error()
    return new Response('Erorr', {
      status: 500,
    })
  }

  const page = +_page, size = +_size;
  const startIndex = page * size;
  const response = [...data].splice(startIndex, size)
  const hasMore = data.length > (startIndex + size )


  return Response.json({ message: "Success", data: response, startIndex, hasMore  });
}

export async function DELETE(request: NextRequest) {
  const params = await request.json();
  const ids = params.ids;
  data = data.filter(x => !ids.includes(x.id))

  if (!ids.length) {
    return Response.json({ message: 'No data to delete', ids, data });
  }
  ctr =0;
  return Response.json({ message: 'Data deleted', data });
}

export async function PATCH() {
  data = [...mockData]
  ctr =0 ;
  return Response.json({ message: 'Data reset' });
}
