import { useState } from 'react';
import { useDaikonContext } from './Context';
import { db } from './firebase';



export const checkQueryExists = async (query) => {
    let ids = [];
    const snapshot = await db.collection('Queries').get().then((querySnapshot)=>{
        const tempDoc = querySnapshot.docs.map((doc) => {
            ids.push(doc.id)
    })})
    if(ids.includes(query)){
        return true;
    }
    else{
        return false;
    }
}

export const createQueryId = (query) =>{
    let id = ''
    const wordsArray = query.split(' ')
    wordsArray.map(word =>{
        id = id + word.slice(0,2);
    })
    return id;
}

export const addNewQuery = async (query) =>{
    if(await checkQueryExists(query) == false){
        const newID = createQueryId(query) 
        const docRef = db.collection('Queries').doc(newID);
        await docRef.set({
            Query : query, 
            Ideas1 : {ideas: [], ratings : []}, 
            Ideas2 : {ideas: [], ratings : []}
          });
    }
    else{
        return;
    }
}

export const addIdeasDB = async (queryID, ideas1,ideas2) =>{
    const queryRef = db.collection('Queries').doc(queryID);
    const res1 = await queryRef.update({"Ideas1.ideas":ideas1});
    const res2 = await queryRef.update({"Ideas2.ideas":ideas2});
}

export const addRatingsDB = async (queryID, ratingsList) =>{
    const queryRef = db.collection('Queries').doc(queryID);
    const res1 = await queryRef.update({"Ideas1.ratings":ratingsList.slice(0,5)});
    const res2 = await queryRef.update({"Ideas2.ratings":ratingsList.slice(-5)});
}