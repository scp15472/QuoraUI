const question = (data) => {
    return new Promise((resolve, reject) => {
        const requestData = {
            string: data.string,
            topicID: data.topicID
        };

        const promise = fetch("/feedservice/question",{
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
export default question;