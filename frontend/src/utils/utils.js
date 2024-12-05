export const getUserIdFromToken = () => {
    const token = localStorage.getItem("data");
    if (token) {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        return payload.userId;
    }
    return null;
};