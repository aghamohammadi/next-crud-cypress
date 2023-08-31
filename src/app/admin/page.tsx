import BlogList from "@/components/blog/blog-list";
import { Envs } from "@/utils/config";
import { getListPageData, getPosts } from "@/utils/services/blog-service";
import { Metadata } from "next";

export const revalidate=0;
// export const dynamic = 'force-dynamic'
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
    title:`Blog - Admin | ${Envs.SITE_TITLE}`
};

const pageData = async (pageNumber, pageCount, order, searchText) => {
    const result = await getListPageData((pageNumber - 1) * pageCount, pageCount, order, searchText);
    if (result.status == 200)
        return result.data;
    else
        return null;
}
const Page = async ({ params, searchParams }) => {
    const pageNumber = searchParams?.page || 1;
    const order = searchParams?.order || 2;
    const searchText = searchParams?.title || '';
    const pageCount = 10;
    const { posts, totalCount } = await pageData(pageNumber, pageCount, +order, searchText);


    return (
        <>
            <BlogList searchText={searchText} order={order} data={posts} pageNumber={+pageNumber} totalCount={+totalCount} pageCount={+pageCount} />
            
        </>
    );
}

export default Page;