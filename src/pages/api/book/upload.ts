import type { APIRoute } from 'astro';
import { db, getUser, storage } from '../../../firebase/client';

import { v4 as uuidv4 } from "uuid";

const user = getUser();


export const POST: APIRoute = async ({request}) => {
  if(!user) return new Response("Unauthorized", { status: 403 })

  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request?.json();
      const uuid = uuidv4();
      const file = await fetch(body.cover)
      const fileAsBlob = await file.blob()
      const ref = storage.ref(`/covers/${uuid}`);
      const uploadTask = ref.put(fileAsBlob);

      uploadTask.on(`state_changed`, console.log, console.error, async () => {
        const url = await ref.getDownloadURL()
        await db.ref(`books/${uuid}`).set({
          ...body,
          image: {
            url,
            alt: `Book cover for ${body.title}`,
          },
        })
        return new Response('Succesfully uploaded book detail', {status: 200})
      });

      return new Response('Succesfully uploaded book detail', {status: 200})
    } catch (err) {
      console.error({err})
      return new Response('Error while uploading book detail', {status: 500})
    }
  } else {
    return new Response('Error while uploading book detail', {status: 400})
  }
}