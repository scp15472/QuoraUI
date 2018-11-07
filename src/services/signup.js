const signup = (user) =>{
    console.log("**********************",user)
    return new Promise((resolve, reject) => {
        const requestData = {
            username: user.username,
            password: user.password,
            confirm_password: user.confirm_password,
            first_name: user.first_name,
            middle_name: "ABC",
            last_name: user.last_name,
            phone: user.phone,
            city: user.city,
            email: user.email,
            gender: user.gender
        };
        console.log(requestData)

        const promise = fetch("/userservice/user",{
            method: 'POST',
            cache: 'no-cache',
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
};

export default signup;