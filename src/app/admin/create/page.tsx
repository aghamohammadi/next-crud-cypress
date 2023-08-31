import BlogCreateForm from "@/components/blog/blog-create-form";
import { Envs } from "@/utils/config";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Create New Post  - Admin | ${Envs.SITE_TITLE}`,
}

const Page = () => {
    return ( 
        <div className="p-10">
            <BlogCreateForm />
        </div>
        
     );
}
 
export default Page;