export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    else return false;
};

export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
};