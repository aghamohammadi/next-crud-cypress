'use client'

import { errorMessage, successMessage } from "@/lib/toast";
import { Post } from "@/utils/models/post";
import { add } from "@/utils/services/blog-service";
import { revalidate } from "@/utils/services/revalidate-service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


const BlogCreateForm = () => {
    const [previewImage, setPreviewImage] = useState('');

    const [submiting, setSubmiting] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'all',
        defaultValues: {
            title: ``,
            summary: '',
            content: '',
            insertDate: '',
            imageFile: null,
            published: true
        }
    });


    const onChangePicture = (e) => {
        setPreviewImage(e.target.files[0]?URL.createObjectURL(e.target.files[0]):'');
        
    };


    const handleSubmitAdd = async (formData) => {
        setSubmiting(true);
        const data = {
            title: formData.title,
            summary: formData.summary,
            content: formData.content,
            imagePath: '',
            insertDate: formData.insertDate,
            published: formData.published,
        }

        const form = new FormData()
        form.append('imageFile', formData.imageFile[0])
        form.append('data', JSON.stringify(data))


        
        const result = await add(form);
        if (result.status === 200) {
            // revalidate({ tag: ['updated'], path: ['/admin'] });

            successMessage('Added successfully.');
            // reset();
            router.refresh();
            router.push('/admin');
        }

        else
            errorMessage(`error : ${result.message}`)

        setSubmiting(false);
    }


    return ( 
        <>

            <form onSubmit={handleSubmit(handleSubmitAdd)} method="post">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text"  id="title" {...register("title", { required: true, maxLength: 70 })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                    {errors.title?.type === 'required' && <p className="error-message mt-2 text-sm text-red-600 dark:text-red-500"> Title is required!</p>}
                    {errors.title?.type === 'maxLength' && <p className="error-message mt-2 text-sm text-red-600 dark:text-red-500">You have reached your maximum limit of characters allowed (70)</p>}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea  id="summary" rows={3} {...register("summary", { required: true, maxLength: 150 })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="summary" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Summary</label>
                    {errors.summary?.type === 'required' && <p className="error-message mt-2 text-sm text-red-600 dark:text-red-500"> Summary is required!</p>}
                    {errors.summary?.type === 'maxLength' && <p className="error-message mt-2 text-sm text-red-600 dark:text-red-500">You have reached your maximum limit of characters allowed (150)</p>}

                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="date" {...register("insertDate", { required: true})} id="insertDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="insertDate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Publish Date</label>
                        {errors.insertDate?.type === 'required' && <p className="error-message mt-2 text-sm text-red-600 dark:text-red-500"> Publish Date is required!</p>}

                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label className="relative inline-flex items-center mt-4 cursor-pointer">
                            <input name="published" type="checkbox" value="" id="published" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Published</span>
                        </label>                    
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <div className="relative z-0 w-full mb-6 group">
                        <a className="inline-block" href={previewImage} target="_blank">
                            <img id="image-preview" className="w-40" src={previewImage} />
                        </a>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="file" {...register("imageFile", { required: true, onChange: (e) => { onChangePicture(e)}, })} id="imageFile" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label htmlFor="imageFile" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image</label>
                        {errors.imageFile?.type === 'required' && <p className="error-message mt-2 text-sm text-red-600 dark:text-red-500"> Image is required!</p>}

                    </div>                    
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea rows={15} {...register("content", { required: true, maxLength: 500 })} id="content" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="content" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Content</label>
                    {errors.content?.type === 'required' && <p className="error-message mt-2 text-sm text-red-600 dark:text-red-500"> Content is required!</p>}
                    {errors.content?.type === 'maxLength' && <p className="error-message mt-2 text-sm text-red-600 dark:text-red-500">You have reached your maximum limit of characters allowed (500)</p>}

                </div>
               
                
                <button disabled={submiting} type="submit" className="inline-flex justify-center text-center text-white whitespace-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit 
                    {submiting && <svg aria-hidden="true" className="w-4 h-4 ms-2 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg>}
                </button>
                <Link href={`/admin`} className="inline-block text-white mt-2 md:mt-0 sm:ms-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Back
                </Link>
            </form>

        </>
     );
}
 
export default BlogCreateForm;