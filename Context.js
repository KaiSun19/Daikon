import { useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { addNewQuery, addRatingsDB, createQueryId} from "./firebaseHelpers";

const DaikonContext = React.createContext() // creates a context 

export function useDaikonContext(){ 
    return useContext(DaikonContext)
}

export const DaikonProvider = ({children}) =>{ 

    // different display size listeners

    
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up("md"));
    const tablet = useMediaQuery(theme.breakpoints.between("xs",'md'));
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    // welcome page quotes

    const welcomeQuotes = [{Quote: 'Creativity is seeing what others see and thinking what no one else ever thought.',Author: 'Albert Einstein'},
    {Quote: 'Art is the elimination of the unnecessary.',Author: 'Pablo Picasso'},
        {Quote: 'Don’t wait for inspiration. It comes while working.',Author: 'Henri Matisse'},
        {Quote: "It's no good being too easily swayed by people's opinions. You have to believe in yourself.",Author: 'Donatella Versace'},
        {Quote: 'There is no doubt that creativity is the most important human resource of all. Without creativity, there would be no progress, and we would be forever repeating the same patterns.',Author: 'Edward De Bono'},
        {Quote: 'Great things are done by a series of small things brought together.',Author: 'Vincent Van Gogh'},
    ]

    const UIStages = ['InitialQuery','Ideas1','PromptsReading','Ideas2','Results','Finish']

    const problems = ["new material to replace plastic", 'new material to replace paper', 'way to recycle any material', 'new way to create biodegradable packaging', 
    'new material to replace wood', 'new energy to replace non-renewable fuel', 'new social programs running parallel to schools', 'course to get rich in university', 
    'better base courses for world awareness', 'a course for tangible lifelong concepts', 'more accurate prediction for global energy consumption', 'new ways to harvest energy from unidentified energy sources', 
    'smart ways to redistribute supplies such as energy away from surplus areas', 'low cost global internet connections', 'social media integrated search engines', 
    'autonomous smart traffic system', 'general purpose robot' , 'dynamically changing material depending on a problem' , 'algorithm for fully secure smart contract development', 'new way to get clean water', 'smart waste water management in rural areas', 
    'cheaper way to provide sanitation products' , 'efficient shower and bath tub system for rural areas', 'water sensitive alternative to products such as water fountains', 'detailed insight into any food product in a supermarket', 
    'way to eradicate factory farming', 'new scientific breakthrough for food diets', 'more accurate prediction of global warming in the next decade', 'method for unbiased data', 'way to reduce the hysteria of data protection', 'scenario of evacuating the world population from earth', 'method to prevent mass destruction from asteroids', 
    'method to eliminate the possibility of nuclear war', 'way to prevent mass destruction from nuclear war', 'new tool to increase communication between governments and communities', 'new way to produce artificial alternatives to biological products such as meat or organs', 
    'new method of fair wealth distribution within a company', 'method to increase insurance contract transparency', 'system to reduce waiting times', 'way to remove hack attacks', 'way for data to be controlled fully by its owner', 'better customer experience system', 'better booking system for transport', 'way to alleviate waiting times in queues',
    'new concept of creating better cities', 'new way to deal with traffic congestion in busy places','way to remove the possibility of government corruption']

    const technologies = ['Artificial Intelligence', 'Internet of Things', 'Nanotechnology', 'Brain Computer Interfaces', '3D Printing',
                            'Digital Twins', 'Gene Editing', 'Extended Reality', '5G', 'active structures', 'machine vision', 'quantum computing','AI generated media',
                        'smart grids', 'graphene', 'robotics']



    // global states

    const [query, setQuery] = useState("I want to make a...");
    const [stage,setStage] = useState(UIStages[0])
    const [firstIdeas,setFirstIdeas] = useState([])
    const [secondIdeas,setSecondIdeas] = useState([])
    const [ideaRatings, setIdeaRatings] = useState([5,5,5,5,5]);
    const [feedback, setFeedback] = useState()
    const [currentStep, setCurrentStep] = useState(UIStages.indexOf(stage))
    const [apiLoading, setApiLoading] = useState(false)
    const [prompts,setPrompts] = useState([" ", " ", " ", " ", " "])
    const [currentID, setCurrentID] = useState(" ")
    const [ratingsList, setRatingsList] = useState([])
    const [similarity, setSimilarity] = useState(1)


    const goToPreviousStage = ()=>{
        if(stage == UIStages[0]){
            return;
        }
        const stageIndex = UIStages.indexOf(stage)
        setStage(UIStages[stageIndex -1])
    }

    const goToNextStage = ()=>{
        if(stage == UIStages[5]){
            return;
        }
        const stageIndex = UIStages.indexOf(stage)
        setStage(UIStages[stageIndex +1])
    }

    useEffect(()=>{
        setCurrentStep(UIStages.indexOf(stage))
    },[stage])

    const generateQuery = async () =>{
        const problemIndex = Math.floor(Math.random() * problems.length);
        const technologiesIndex = Math.floor(Math.random() * technologies.length);
        const generatedQuery = `I want to make a ${problems[problemIndex]} using ${technologies[technologiesIndex]}`
        setQuery(generatedQuery)
        const newID = createQueryId(generatedQuery)
        setCurrentID(newID) 
        await addNewQuery(newID,generatedQuery)
    }

    var axios = require('axios');

    const getPrompts = () =>{
        if(query !== "I want to make a..."){
            setApiLoading(true)
            console.log(query)
            var data = JSON.stringify({
                "text": query
            });
    
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://getsynonyms-m3jn7lm4ka-uc.a.run.app/prompts',
                mode: 'no-cors',
                headers: { 
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                data : data
            };
    
            axios(config)
                .then(function (response) {
                        const prompts = Object.values(JSON.parse(JSON.stringify(response.data.prompts[1])))
                        const avgSimilarity = JSON.parse(JSON.stringify(response.data.prompts[0]))
                        setPrompts(prompts)
                        setSimilarity(avgSimilarity)
                        console.log(prompts)
                        console.log(avgSimilarity)
                        setApiLoading(false)
                    })
                .catch(function (error) {
                    setApiLoading(false)
                    console.log(error);
                });
        }
        else{
            return ;
        }

    }

    useEffect(()=>{
        if(query !== "I want to make a..."){
            getPrompts();
        }
        else{
            return;
        }
    },[query])

    // sends request to get ratings for ideas . 

    const getRatings = (query,firstIdeas,secondIdeas) =>{
        if(query && firstIdeas && secondIdeas){
            setApiLoading(true)
            const ideasList = [query].concat(firstIdeas).concat(secondIdeas)
            var data = JSON.stringify({
                "data": ideasList
            });
    
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://getsynonyms-m3jn7lm4ka-uc.a.run.app/ratings',
                mode: 'no-cors',
                headers: { 
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                data : data
            };
    
            axios(config)
                .then(function (response) {
                        const ratings = Object.values(JSON.parse(JSON.stringify(response.data)))
                        addRatingsDB(currentID, ratings[0],firstIdeas.length)
                        setRatingsList(ratings[0])
                        setApiLoading(false)
                    })
                .catch(function (error) {
                    setApiLoading(false)
                    console.log(error);
                });
        }
        else{
            return ;
        }

    }




    return(
        <DaikonContext.Provider
            value = {{ 
                desktop,
                tablet,
                mobile,
                welcomeQuotes,
                UIStages, 
                query,
                setQuery,
                firstIdeas,
                setFirstIdeas,
                secondIdeas,
                setSecondIdeas,
                ideaRatings,
                setIdeaRatings,
                stage,
                setStage,
                goToPreviousStage,
                goToNextStage,
                currentStep,
                generateQuery,
                feedback, 
                setFeedback, 
                getPrompts, 
                apiLoading,
                prompts, 
                currentID, 
                setCurrentID,
                getRatings,
                ratingsList,
                similarity
            }}>
                {children}

        </DaikonContext.Provider>

)}




