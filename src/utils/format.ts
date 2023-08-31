// .toFixed(2);




export const toUrlFormat=(value: string): string =>{
    return value?.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/”/g, '')
        .replace(/\./g, '')
        .replace(/\//g, '-')
        .replace(/\\/g, '-');

}


