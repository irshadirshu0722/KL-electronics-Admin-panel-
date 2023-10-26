export const dateConveter = (datetime)=>{
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Note: Months are 0-based, so add 1 to get the correct month
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

}