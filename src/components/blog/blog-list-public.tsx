import { Post } from "@/utils/models/post";
import Link from "next/link";
import Pager from "./pager";
import { toUrlFormat } from "@/utils/format";

const BlogListPublic = ({ data, pageNumber, totalCount, pageCount }) => {
    return ( 
        <>
            <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data && data.map((item: Post, key: number) => (
                        <div key={key} className="item">
                            <div className="item-img">
                                <Link href={`/blog/${item.id}/${toUrlFormat(item.title) }`} title={item.title}>
                                    <img src={item.imagePath} />
                                </Link>                                
                            </div>
                            <div className="item-info mt-2">
                                <h2 className="title mb-1 font-semibold">
                                    <Link href={`/blog/${item.id}/${toUrlFormat(item.title)}`} title={item.title}>
                                        {item.title}
                                    </Link>
                                </h2>
                                <div className="date text-xs text-gray-500 mb-1">
                                    {item.insertDate}
                                </div>
                                <div className="summary text-sm text-gray-600">
                                    <p className="text-justify">{item.content}</p>  
                                </div>
                            </div>                           
                        </div>
                    ))}
                
                
                </div>

                <div className="flex justify-center mt-10 mb-5">
                    <Pager currentPage={pageNumber} totalCount={totalCount} pageCount={pageCount} />
                </div>
            </div>
        </>
     );
}
 
export default BlogListPublic;