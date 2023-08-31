'use client'
import usePushQuery from "@/hooks/usePushQuery";
import { toUrlFormat } from "@/utils/format";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogListToolbar = ({ order, searchText }) => {
    const [search, setSearch] = useState(searchText);
    // useEffect(() => {
    //     if (searchText)
    //         setSearch(searchText.replace(/-/g, ' '));
    // }, []);
    const { pushQuery } = usePushQuery();

    const onChangeOrder = (order: number) => {
        pushQuery([{ name: 'order', value: order.toString() }]);
    }
    const onClickSearchText = () => {
        pushQuery([{ name: 'title', value: toUrlFormat(search) }, { name: 'page', value: "1" }]);
        // setSearch(searchText?.replace(/-/g, ' '));

    }

    
    return ( 
        <div className="toolbar p-2 flex justify-between">
            <div className="actions">
                <Link href={`/admin/create`} className="create-btn bg-green-500 hover:bg-green-700 transition text-white font-bold py-2 px-4 rounded">
                    Add New
                </Link>
            </div>            
            <div className="search flex items-center">
                <label htmlFor="orders" className="whitespace-nowrap block me-2 text-sm font-medium text-gray-900">Search :</label>
                <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" id="search-text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Search in title" />
                <button onClick={(e) => { onClickSearchText() }} className="ms-2 bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded">
                    Search
                </button>
            </div>
            <div className="sort flex items-center">
                <label htmlFor="orders" className="whitespace-nowrap block me-2 text-sm font-medium text-gray-900">Select an Order :</label>
                <select id="orders" defaultValue={order} onChange={(e) => { onChangeOrder(+e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                    <option value="0">Date - Des</option>
                    <option value="1">Date - Asc</option>
                    <option value="2">Last Import - Des</option>
                    <option value="3">Last Import - Asc</option>
                </select>
            </div>

        </div>
     );
}
 
export default BlogListToolbar;