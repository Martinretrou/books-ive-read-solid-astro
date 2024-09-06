import {
  type Component,
  createEffect,
  createSignal,
  splitProps,
} from "solid-js";

import { createFileUploader } from "@solid-primitives/upload";
import { Select } from "./Select";
import { createInputMask } from "@solid-primitives/input-mask";
import { Checkbox } from "./Checkbox";

import axios from "axios";
import type { IBook } from "../types/book";

type BookFormProps = {
  class?: string;
  authors: string[];
  years: string[];
  rating: string[];
  book?: IBook;
};

export const BookForm: Component<BookFormProps> = (props) => {
  const [local] = splitProps(props, [
    "class",
    "authors",
    "years",
    "rating",
    "book",
  ]);
  const [uploadedCover, setUploadedCover] = createSignal<string | null>(
    local.book?.image.url || null
  );
  const [form, setForm] = createSignal<{ [key: string]: string | File | null }>(
    {
      title: local.book?.title || null,
      author: local.book?.author || null,
      readIn: local.book?.readIn || null,
      review: local.book?.review || null,
      pages: String(local.book?.pages) || null,
      currentlyReading: String(local.book?.currentlyReading) || null,
      publicationDate: local.book?.publicationDate || null,
      finishedDate: local.book?.finishedDate || null,
      comment: local.book?.comment || null,
      cover: null,
    }
  );

  let inputMaskRef;
  const dateMask = createInputMask("9999-99-99");

  const { selectFiles } = createFileUploader();

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSubmit = async () => {
    try {
      let nextCover = null;
      if (!!form().cover) {
        nextCover = await toBase64(form().cover as File);
      } else {
        nextCover = local.book?.image.url;
      }

      const response = await axios.post(
        "/api/book/upload",
        JSON.stringify({ ...form(), cover: nextCover }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log({ response });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div class='bg-white border p-[4vw] border-black p gap-[4vw] relative form grid grid-cols-12'>
      <div class='col-span-3'>
        {uploadedCover() ? (
          <img
            class='h-[450px] w-[300px]'
            onClick={() => {
              selectFiles(([item]) => {
                setUploadedCover(URL.createObjectURL(item.file));
                setForm({ ...form(), cover: item.file });
              });
            }}
            src={uploadedCover() as string}
          />
        ) : (
          <div
            class='relative border border-black h-[450px] w-[300px] flex items-center justify-center cursor-pointer'
            onClick={() => {
              selectFiles(([item]) => {
                setUploadedCover(URL.createObjectURL(item.file));
                setForm({ ...form(), cover: item.file });
              });
            }}
          >
            <p>Click here to add book cover</p>
          </div>
        )}
      </div>
      <div class='col-span-9 grid grid-cols-2 gap-4'>
        <label class='flex flex-col mb-6 font-bold'>
          Title
          <input
            class='border border-black bg-white h-10 mt-2 pl-2 font-normal'
            type='text'
            name='title'
            id='title'
            placeholder='Book title here'
            value={form().title as string}
            onChange={(e) =>
              setForm({ ...form(), title: e.currentTarget.value })
            }
          />
        </label>
        <label class='flex flex-col mb-6 font-bold'>
          Author
          <Select
            initialValue={form().author as string}
            onChange={(value) => setForm({ ...form(), author: value })}
            options={local.authors}
          />
        </label>
        <label class='flex flex-col mb-6 font-bold'>
          Read in
          <Select
            initialValue={form().readIn as string}
            onChange={(value) => setForm({ ...form(), readIn: value })}
            options={local.years}
          />
        </label>
        <label>
          Currently reading this book
          <Checkbox
            value={form().currentlyReading as string}
            onChange={(state) =>
              setForm({ ...form(), currentlyReading: String(state) })
            }
          />
        </label>
        <label class='flex flex-col mb-6 font-bold'>
          Finished the
          <input
            class='border border-black bg-white h-10 mt-2 pl-2 font-normal'
            type='text'
            name='finishedDate'
            id='finishedDate'
            placeholder='DD/MM/YYY'
            ref={inputMaskRef}
            oninput={dateMask}
            onPaste={dateMask}
            value={form().finishedDate as string}
            onChange={(e) =>
              setForm({ ...form(), finishedDate: e.currentTarget.value })
            }
          />
        </label>
        <label class='flex flex-col mb-6 font-bold'>
          Rating for this book
          <Select
            initialValue={form().review as string}
            onChange={(value) => setForm({ ...form(), review: value })}
            options={local.rating}
          />
        </label>
        <label class='flex flex-col mb-6 font-bold'>
          Number of pages in this book
          <input
            class='border border-black bg-white h-10 mt-2 pl-2 font-normal'
            type='text'
            name='pages'
            id='pages'
            placeholder='999...'
            value={form().pages as string}
            onChange={(e) =>
              setForm({ ...form(), pages: e.currentTarget.value })
            }
          />
        </label>
        <label class='flex flex-col mb-6 font-bold'>
          Comment/review of this book
          <textarea
            class='border border-black bg-white h-10 mt-2 pl-2 font-normal w-full min-h-[40px]'
            name='comment'
            id='comment'
            placeholder='Pretty good, way too long..'
            value={form().comment as string}
            onChange={(e) =>
              setForm({ ...form(), comment: e.currentTarget.value })
            }
          />
        </label>
      </div>
      <button
        type='submit'
        onClick={handleSubmit}
        class='bg-black text-white w-fit py-3 px-8 ml-auto col-span-12 cursor-pointer'
      >
        Submit
      </button>
    </div>
  );
};
