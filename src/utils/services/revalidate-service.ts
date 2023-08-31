import { Envs } from "../config";

export const revalidate = async (data:{path?:string[],tag?:string[]})
    : Promise<any> => {
    if (data.path && data.tag && data.path.length < 1 && data.tag.length < 1)
        return;
    let url = `${Envs.BASE_URL}/api/revalidate?secret=${Envs.MY_SECRET_TOKEN}`;
    if (data.path && data.path.length>0)
        url += `&path=${data.path.join(',')}`;
    if (data.tag && data.tag.length > 0)
        url += `&tag=${data.tag.join(',') }`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },            
            cache: 'no-store' 
        });
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw res;
        }
        return { status: 200, message: '', data: await res.json() };
    } catch (e) {
        return { status: 500, message: e, data: null };
    }

}