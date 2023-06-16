class LocalStorageService {
  getItem(key) {
    console.log(localStorage.getItem(key));
    return localStorage.getItem(key);
  }

  setItem(key,value){
    console.log("Setting");
    return localStorage.setItem(key,value)
  }

  removeItem(key) {
    return localStorage.removeItem;
  }
}

export default LocalStorageService;
