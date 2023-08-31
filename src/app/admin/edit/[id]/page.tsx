import BlogCreateForm from "@/components/blog/blog-create-form";
import BlogEditForm from "@/components/blog/blog-edit-form";
import { Envs } from "@/utils/config";
import { getPost } from "@/utils/services/blog-service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 0;

export const metadata: Metadata = {
    title: `Edit Post  - Admin | ${Envs.SITE_TITLE}`,
}

const pageData = async (id) => {
    const result = await getPost(id);
    if (result.status == 200)
        return result.data;
    else
        return null;
}

const Page = async ({ params }) => {
    const id = params.id;
    if (!id || !Number(id))
        return notFound;
    const data = await pageData(id);
    if (!data)
        return notFound();
    return ( 
        <div className="p-10">
            <BlogEditForm postData={data} />
        </div>
        
     );
}
 
export default Page;