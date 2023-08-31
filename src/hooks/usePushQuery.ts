import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const usePushQuery = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pushQuery = (items: { name: string, value: string }[]) => {
        const params = new URLSearchParams(searchParams.toString())
        items.forEach((item)=>{
            if (item.value)
                params.set(item.name, item.value.toLowerCase());
            else
                params.delete(item.name);
        });
        
        router.push(`?${params.toString()}`);
    };

    return { pushQuery};

}

export default usePushQuery