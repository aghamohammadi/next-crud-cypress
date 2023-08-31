import { Post } from "@/utils/models/post";
import Link from "next/link";
import Pager from "./pager";
import BlogListToolbar from "./blog-list-toolbar";

const BlogList = ({ data, pageNumber, totalCount, pageCount, order, searchText }) => {  

    return ( 
        <>
            <div className="flex flex-col sm:px-6 lg:px-8">
                <BlogListToolbar searchText={searchText} order={order}/>
                <div className="py-2 overflow-x-auto">
                        <table className="w-full text-left text-sm font-light">
                            <thead
                                className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Id</th>
                                    <th scope="col" className="px-6 py-4">Title</th>
                                    <th scope="col" className="px-6 py-4">Summary</th>
                                    <th scope="col" className="px-6 py-4">InsertDate</th>
                                    <th scope="col" className="px-6 py-4">Published</th>
                                    <th scope="col" className="px-6 py-4">Edit</th>
                                    <th scope="col" className="px-6 py-4">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(data && data.length>0) ? data.map((item: Post, key: number) => (
                                    <tr key={key} className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                        <td className="id whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                                        <td className="title whitespace-nowrap px-6 py-4">{item.title}</td>
                                        <td className="summary whitespace-nowrap px-6 py-4">{item.summary}</td>
                                        <td className="insertDate whitespace-nowrap px-6 py-4">{item.insertDate}</td>
                                        <td className="published whitespace-nowrap px-6 py-4">{item.published?'Yes':'No'}</td>
                                    <td className="edit whitespace-nowrap px-6 py-4">
                                            <Link href={`/admin/edit/${item.id}`} className="bg-yellow-500 hover:bg-yellow-700 transition text-white font-bold py-2 px-4 rounded">
                                                Edit
                                            </Link>                                               
                                    </td>
                                    <td className="delete whitespace-nowrap px-6 py-4"> 
                                            <Link href={`/admin/delete/${item.id}`} className="bg-red-500 hover:bg-red-700 transition text-white font-bold py-2 px-4 rounded">
                                            Delete
                                            </Link>  
                                    </td>
                                </tr>
                                ))
                                :
                            
                                <tr><td colSpan={7}><p className="font-semibold text-lg text-center p-5">No Item!</p></td></tr>
                            } 
                            </tbody>
                        </table>
                </div>
                <div className="flex justify-center">
                    <Pager currentPage={pageNumber} totalCount={totalCount} pageCount={pageCount} />
                </div>
                
            </div>
        </>
     );
}
 
export default BlogList;