const feed = () => {
    return new Promise((resolve, reject) => {
        const promise = fetch("/feedservice/feeds");
        promise.then((response) =>{
            const dataPromise = response.json();
            dataPromise.then((data)=>{
                console.log(data);
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    })
}
export default feed;
