import { toUrlFormat } from "@/utils/format";
import Link from "next/link";

const BlogItem = ({ item }) => {
    return ( 
        <div  className="item">
            <div className="item-img">
                <Link href={`/blog/${item.id}/${toUrlFormat(item.title)}`} title={item.title}>
                    <img src={item.imagePath} />
                </Link>
            </div>
            <div className="item-info mt-2">
                <h2 className="title mb-1 font-semibold">
                    {item.title}
                </h2>
                <div className="date text-xs text-gray-500 mb-1">
                    {item.insertDate}
                </div>
                <div className="summary text-sm text-gray-600">
                    <p className="text-justify">{item.content}</p>
                </div>
            </div>
        </div>
     );
}
 
export default BlogItem;