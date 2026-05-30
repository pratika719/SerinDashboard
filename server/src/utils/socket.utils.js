export const toId = (value) => {
    if (value === undefined || value === null) return "";
    return value.toString();
};