import { db } from './firebase';

var Filter = require('bad-words'),
    wordsFilter = new Filter();

export const checkText = (text)=>{
    if(text.split(' ').length < 5){
        return 'Too Short'
    }
    else if(wordsFilter.clean(text).includes('*')){
        return 'Bad Word'
    }
    else{
        return 'OK'
    }
}

export const createQueryId = (query) =>{
    let id = ''
    const wordsArray = query.split(' ')
    wordsArray.map(word =>{
        id = id + word[0]
    })
    return id;
}

export const addQuery = async (query) =>{
    console.log(checkText(query))
    if(checkText(query) == 'OK'){
        const docRef = db.collection('Queries').doc(createQueryId(query));
        await docRef.set({
            Query : query, 
            Ideas : []
          });
    }
    else{
        return checkText(query)
    }
}