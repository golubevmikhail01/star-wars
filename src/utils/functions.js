export const isFresh = (obj, days) => {
    if (!obj || typeof obj !== "object") return false;
    if (!obj.lastUpdateData) return false;
    return Date.now() - obj.lastUpdateData <= days;
}