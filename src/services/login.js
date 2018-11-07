const login = (user) => {
    // console.log(username,password, "InSide service....")
    return new Promise((resolve, reject) => {
        const requestData = {
            username: user.username,
            password: user.password,
            device_id: "Something..."
        };

        const promise = fetch("/userservice/login",{
            method: 'POST',
            catch: 'no-cache',
            body: JSON.stringify(requestData),
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
export default login;
