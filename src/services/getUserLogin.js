const getUserLogin = (user) => {
    // console.log(username,password, "InSide service....")
    return new Promise((resolve, reject) => {
        const promise = fetch("/userservice/login",{
            method: 'GET',
            catch: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'same-origin'
        });

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
export default getUserLogin;