import BlogListPublic from '@/components/blog/blog-list-public';
import { Envs } from '@/utils/config';
import { getListPageData } from '@/utils/services/blog-service';
import { Metadata } from 'next';
import Image from 'next/image'

export const metadata: Metadata = {
  title: `Home | ${Envs.SITE_TITLE}`
};
const pageData = async (pageNumber, pageCount) => {
  const result = await getListPageData((pageNumber - 1) * pageCount, pageCount, 2);
  if (result.status == 200)
    return result.data;
  else
    return null;
}
const Page = async ({ params, searchParams }) => {
  const pageNumber = searchParams?.page || 1;
  const pageCount = 12;
  const { postsPublished, totalCountPublished } = await pageData(pageNumber, pageCount);

  return (
    <>
      <BlogListPublic data={postsPublished} pageNumber={+pageNumber} totalCount={+totalCountPublished} pageCount={+pageCount} />

    </>
  );
}

export default Page;