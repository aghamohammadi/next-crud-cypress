import { Envs } from "../config";

export const getListPageData = async (from, to, order, searchText='')
    : Promise<any> => {

    const url = `${Envs.BASE_URL}/api/post`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                from, to, order, searchText
            }),
            next: { tags: ['updated'] } 
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
export const getPosts = async (count)
    : Promise<any> => {

    const url = `${Envs.BASE_URL}/api/post/getAll`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                count
            }),
            next: { tags: ['updated'] } 
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
export const getPost = async (id)
    : Promise<any> => {

    const url = `${Envs.BASE_URL}/api/post/get-post/${id}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
            next: { tags: [`updated-${id}`] } 
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
export const add = async (formData: FormData)
    : Promise<any> => {

    const url = `${Envs.BASE_URL}/api/post/add`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: formData
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
export const edit = async (formData: FormData)
    : Promise<any> => {

    const url = `${Envs.BASE_URL}/api/post/edit`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: formData
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
export const remove = async (id: number)
    : Promise<any> => {

    const url = `${Envs.BASE_URL}/api/post/remove`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                id
            })
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