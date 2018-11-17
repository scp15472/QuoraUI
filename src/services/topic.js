const topic = (data) => {
    return new Promise((resolve, reject) => {
        const requestData = {
            topic_id: data.topic_id,
            name: data.name
        };

        const promise = fetch("/feedservice/topic",{
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
export default topic;