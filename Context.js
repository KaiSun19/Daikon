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

    const problems = ["new material to replace plastic", 'new material to replace paper', 'recycle any material', 'new way to create biodegradable packaging', 
    'new material to replace wood', 'new energy to replace non-renewable fuel', 'new social programs running parallel to schools', 'a course to get rich in university', 
    'better base courses for world awareness', 'a course for tangible lifelong concepts', 'more accurate prediction for global energy consumption', 'new ways to harvest energy from unidentified energy sources', 
    'smart ways to redistribute supplies such as energy away from surplus areas', 'low cost global internet connections', 'social media integrated search engines', 
    'autonomous smart traffic systems', 'general purpose robots' , 'dynamically changing materials depending on a problem' , 'algorithm for fully secure smart contract development', 'new way to get clean water', 'smart waste water management in rural areas', 
    'cheaper ways to provide sanitation products' , 'efficient showers and bath tub systems for rural areas', 'water sensitive alternative to products such as water fountains', 'unified insight into any food product in a supermarket', 
    'eradicate factory farming', 'new scientific evidence for food diets', 'more accurate prediction of global warming in the next decade', 'unbiased data', 'reduce the hysteria of data protection', 'scenario of evacuating the world population from earth', 'method to prevent mass destruction from asteroids', 
    'method to eliminate the possibility of nuclear war', 'way to prevent mass destruction from nuclear war', 'new tool to increase communication governments and communities', 'new way to produce artificial alternatives to biological products such as meat or organs', 
    'new method of fair wealth distribution within a company', 'method to increase insurance contract transparency', 'system to reduce waiting times']

    const technologies = ['Artificial Intelligence', 'Internet of Things', 'Nanotechnology', 'Brain-Computer Interfaces', '3D Printing',
                            'Digital Twins', 'Gene Editing', 'Extended Reality', '5G']



    // global states

    const [query, setQuery] = useState("I want to make a...");
    const [stage,setStage] = useState(UIStages[0])
    const [firstIdeas,setFirstIdeas] = useState([" ", " ", " ", " ", " "])
    const [secondIdeas,setSecondIdeas] = useState([" ", " ", " ", " ", " "])
    const [ideaRatings, setIdeaRatings] = useState([5,5,5,5,5]);
    const [feedback, setFeedback] = useState()
    const [currentStep, setCurrentStep] = useState(UIStages.indexOf(stage))
    const [apiLoading, setApiLoading] = useState(false)
    const [prompts,setPrompts] = useState([" ", " ", " ", " ", " "])
    const [currentID, setCurrentID] = useState(" ")
    const [ratingsList, setRatingsList] = useState([0,0,0,0,0,0,0,0,0,0])


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
        await addNewQuery(generatedQuery)
    }

    var axios = require('axios');

    const startServer = () =>{
        var data = JSON.stringify({
            "text": 'Server starting'
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
                    const prompts = Object.values(JSON.parse(JSON.stringify(response.data)))
                    console.log(prompts);
                })
            .catch(function (error) {
                console.log(error);
            });
    }

    // useEffect(()=>{
    //     startServer();
    // },[])

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
                        const prompts = Object.values(JSON.parse(JSON.stringify(response.data)))
                        setPrompts(prompts)
                        console.log(prompts)
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
                        addRatingsDB(currentID, ratings[0])
                        setRatingsList(ratings[0])
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
                ratingsList
            }}>
                {children}

        </DaikonContext.Provider>

)}




