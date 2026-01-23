import { useRouter } from "next/navigation";

const reactHook = () => {
  const router = useRouter();
  const navigate = (path) => router.push(path);

  const setStorage = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  const getStorage = (key) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
  };

  const removeStorage = (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };

  const clearStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  };

  const setCookie = (key, value, days = 7) => {
    if (typeof document !== "undefined") {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = key + "=" + (value || "") + expires + "; path=/";
    }
  };

  const getCookie = (key) => {
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(key + "=")) {
          return cookie.substring(key.length + 1);
        }
      }
    }
    return null;
  };

  const removeCookie = (key) => {
    if (typeof document !== "undefined") {
      document.cookie =
        key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    }
  };

  return {
    navigate,
    setStorage,
    getStorage,
    removeStorage,
    clearStorage,
    setCookie,
    getCookie,
    removeCookie,
  };
};

export default reactHook;
