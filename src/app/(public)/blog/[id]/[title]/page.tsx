import BlogItem from "@/components/blog/blog-item";
import { Envs } from "@/utils/config";
import { getPost } from "@/utils/services/blog-service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const pageData = async (id) => {
    const result = await getPost(id);
    if (result.status == 200)
        return result.data;
    else
        return null;
}
export async function generateMetadata(
    { params }: any
): Promise<Metadata> {

    const id = params.id;
    if (id && Number(id))
    {
        const data = await pageData(id);
        if (data) {
            return {
                title: `${data.title} | ${Envs.SITE_TITLE}`,
                description: data.summary,

            }
        }
    }


    return {

    }
}

const Page = async ({ params }) => {
    const id = params.id;
    if (!id || !Number(id))
        return notFound;
    const data = await pageData(id);
    if (!data)
        return notFound();
    return ( 
        <>
            <div className="view-page p-5">
                <BlogItem item={data} />
            </div>
        </>
     );
}
 
export default Page;