'use client'
import usePushQuery from "@/hooks/usePushQuery";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Pager = ({ totalCount, currentPage, pageCount }) => {
    const { pushQuery } = usePushQuery();



    const totalPages = Math.ceil(totalCount / pageCount);
    const [pages, setPages] = useState([] as any);

    useEffect(() => {
        setPages(getPages(currentPage, totalPages));

    }, [totalCount, currentPage]);

    const getPages = (current: number, total: number): number[] => {
        if (total <= 7) {
            return [...Array(total).keys()].map((x) => ++x);
        }
        if (current > 5) {
            if (current >= total - 4) {
                return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
            } else {
                return [1, -1, current - 1, current, current + 1, -1, total];
            }
        }
        return [1, 2, 3, 4, 5, -1, total];
    }


    const onChangePage = (page: number) => {
        if (page != currentPage)
            pushQuery([{ name: 'page', value: page.toString()}]);

    }


    return (
        <nav aria-label="Page navigation example">
            {pages && pages.length > 0 &&<ul className="list-style-none flex">
                <li>
                    <button className={currentPage !== 1 || totalPages == 0 ? "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100" : "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 disabled"}
                        disabled={currentPage === 1 || totalPages == 0}
                        onClick={() => { onChangePage(currentPage - 1) }}>Previous</button>
                </li>
                {pages && pages.map((page: number, i: number) => (
                    <li key={i} >
                        {page !== -1 ? <button className={page === currentPage ? "relative block rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-600 transition-all duration-300" : "relative block rounded bg-transparent px-3 py-1.5 text-sm  hover:bg-neutral-100  transition-all duration-300"}
                        
                            onClick={() => { onChangePage(page) }}>{page}</button>
                            :
                            <a className="page-link more" > ... </a>
                        }
                </li>
                ))}
                
                <li>
                    <button className={currentPage !== totalPages || totalPages == 0 ? "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100" : "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 disabled"}
                        disabled={currentPage === totalPages || totalPages == 0} onClick={() => onChangePage(currentPage + 1)}>Next</button>
                </li>
            </ul>}
        </nav>
       
    );
}
 
export default Pager;