import { useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { addNewQuery, createQueryId} from "./firebaseHelpers";

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

    const UIStages = ['InitialQuery','Ideas1','PromptsReading','Ideas2','IdeasRating','Finish']

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

    const mockPrompts = [' TLDR  video here  This blog post is a continuation of that series  Everything you look at  every twitch of your arm  every action you take can potentially be recorded  Drawing a circle creates a sphere  while drawing a triangle creates a cube  The network is trained on circles  squares  and triangles  So this was super cool  and it was quite surprising how well it worked  But here s where I ran into the first problem with my  assumptions  Some additional UI thinking was required  What if instead of drawing a tree  I drew a square  However it s easy to imagine how you could run out of primitive shapes quickly  If you have to remember an arbitrary mapping  it s too hard  Above my hand is an icon indicating which object I have currently selected  Switching things up with a very hacky interface  Here you can see drawing and placement as two separate interaction modes  That s a bit out of my reach unfortunately  Perhaps you can t remember the name of something  Or what if you re in a busy office setting and your audio samples become too noisy ', 
                        ' Of course not _all_ animation is useful  If you ve never done animation before don t worry  it s actually pretty straightforward  We ll show you how with a simple 5 step process  Narratives and stories are the most engaging ways to communicate with others  _The first step is to define what exactly you re trying to communicate_  Figure this out  Spend some time absorbing work that _you_ find mesmerizing and special  Note that they vary quite a bit in their implementation but are all fundamentally describing a product  Stripe Connect and really anything on stripe com   district0x   Mac Age of Ultron https   www behance net gallery 28669249 AVENGERS Age of  Ultron UI Reel     This is for me the creative aspect  I will typically start at a high level and start infilling as I continue to sketch  This sits somewhere in between sketching and writing  and when I m in a crunch this can be the only tool I use  At a minimum it will define each  scene  of the animation while also letting me annotate how that scene enters and exits  The early examples I showed in step 2 are made with very different types of technology  Depending on your project s timeline and resources you can leverage each technique as you see fit  These are ordered loosely based on difficulty and time  Open up the timeline window  add each layer to a keyframe  and interpolate between the frames  Save for web  It also helps that they re starting to become a design tool which simplifies the workflow  Jumping on Codepen and forking other s animations or even my own  is a really fast iteration technique  Clients love it  I ve been able to upsell my services at better rates based on something I would have done for fun anyway ', 
                        '   Typography Insight for HoloLens       News Space for HoloLens      A spatial news headline visualizer which fills up your room with the latest news headlines     I wanted to share my design and development story  Books are great but often books on typography get left on the shelves  I started sketching out some ideas about the environment    Windows 10 Fall Creators Update           Unity 2017 2 0p1 MRTP4         Visual Studio 2017 Community           Fall Creators Update SDK         Mixed Reality Toolkit       It could be quite different from what you imagined and designed in the 2D editor  You can see your updates in real time in the headset  You can simply think it as three dimensional background  It makes the user feel safe and grounded  The floor is included in the   MixedRealityCamera prefab   in MRTK  You can easily understand how to use it if you are familiar with After Effects or Flash  Trigger   for Select         Thumbstick   for Teleport and Locomotion       They are pointing specific button and explaining its behavior  The 3D model asset should be exported as glTF 2 0 format    Museum of Type       Typography Insight for HoloLens     Twitter video     All experiments and related opinions are my own    Virtual Reality     Mixed Reality     VR     Typography  Dong Yoon Park https   medium com  dongyoonpark  Go to the profile of Dong Yoon Park  Designer   Creative Technologist  Opinions are my own ']


    const mockIdeas = ['A spaceship that uses new gravity to lift off earth ', 'A new theory for quantum physics that can solve everything', 
                        'The merge of robotics with biotechnology to create hybrid bio-robots', 'Neuroscientific basis for human to human connections',
                           'New metallic alloys that can survive extreme conditions']


    // global states

    const [query, setQuery] = useState("I want to make a...");
    const [stage,setStage] = useState(UIStages[0])
    const [firstIdeas,setFirstIdeas] = useState([" ", " ", " ", " ", " "])
    const [secondIdeas,setSecondIdeas] = useState([" ", " ", " ", " ", " "])
    const [ideaRatings, setIdeaRatings] = useState([5,5,5,5,5]);
    const [feedback, setFeedback] = useState()
    const [currentStep, setCurrentStep] = useState(UIStages.indexOf(stage))
    const [apiLoading, setApiLoading] = useState(false)
    const [prompts,setPrompts] = useState([" ", " "])
    const [currentID, setCurrentID] = useState(" ")


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

    // code to check if strings are english and appropiate

    var Filter = require('bad-words');
    const wordsFilter = new Filter();

    const ValidWords = (sentence) => {
        let hyphen = 0;
        let size = sentence.length;
        if (sentence[0] >= 'A' && sentence[0] <= 'Z' || sentence[0] >= 'a' && sentence[0] <= 'z')
        {
            for (let i = 0; i < size; i++)
            {
                // Check for numbers
                if (sentence[i] >= '0' && sentence[i] <= '9')
                    return false;
                if (sentence[i] >= 'A' && sentence[i] <= 'Z')
                    return false;
 
                if (sentence[i] >= 'a' && sentence[i] <= 'z' ||
                sentence[i] >= 'A' && sentence[i] <= 'Z')
                    continue;
 
                if (sentence[i] == '-') {
                    // Only 1 hyphen is allowed
                    if (++hyphen > 1)
                        return false;
 
                    // hyphen should be surrounded
                    // by letters
                    if (i - 1 < 0
                        || !(sentence[i - 1] >= 'a' &&
                        sentence[i - 1] <= 'z' ||
                        sentence[i - 1] >= 'A' &&
                        sentence[i - 1] <= 'Z')
                        || i + 1 >= size
                        || !(sentence[i + 1] >= 'a' &&
                        sentence[i + 1] <= 'z' ||
                        sentence[i + 1] >= 'A' &&
                        sentence[i + 1] <= 'Z'))
                        return false;
                }
 
                // Punctuation must be at the
                // end of the word
                else if (i != size - 1
                    && ((sentence[i] == '!'
                        || sentence[i] == ','
                        || sentence[i] == ';'
                        || sentence[i] == '.'
                        || sentence[i] == '?'
                        || sentence[i] == '-'
                        || sentence[i] == '\''
                        || sentence[i] == '\"'
                        || sentence[i]
                        == ':')))
                    return false;
            }
        }
        else
            return true;
    }

    const checkText = (text)=>{
        let word = text.split(' ');
        let isEnglish = true;
        let isAppropiate = true;
        for (let indx in word){
            if(ValidWords(word[indx])){
                isEnglish = true;
            }
            else if(!ValidWords(word[indx])){
                isEnglish = false;
            }

        }
        if(text !== " " && text!== undefined){
            if(wordsFilter.clean(text).includes('*')){
                isAppropiate = false;
            }
        }
        if(isEnglish && isAppropiate){
            return 'OK'
        }
        else if(!isEnglish || !isAppropiate){
            return 'Invalid Text'
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
                mockPrompts,
                currentStep,
                mockIdeas, 
                generateQuery,
                feedback, 
                setFeedback, 
                getPrompts, 
                apiLoading,
                prompts, 
                currentID, 
                setCurrentID,
                checkText
            }}>
                {children}

        </DaikonContext.Provider>

)}




