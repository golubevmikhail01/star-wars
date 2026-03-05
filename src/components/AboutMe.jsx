import {baseURL, THIRTY_DAYS} from "../utils/constants.js";
import {useEffect, useState} from "react";
import hero from "../assets/main.jpg";
import {isFresh} from "../utils/functions.js";

const AboutMe = () => {
    const [aboutMe, setAboutMe] = useState(() => {
        try {
            const data = localStorage.getItem('about_me');
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (!aboutMe || !isFresh(aboutMe, THIRTY_DAYS)) {
            const loadData = async () => {
                try {
                    const res = await fetch(`${baseURL}/v1/peoples/1`);
                    const data = await res.json();

                    const planetRes = await fetch(`${baseURL}/v1/planets/${data.homeworld}`);
                    const planet = await planetRes.json();

                    const newData = {
                        ...data,
                        homeworld: planet.name,
                        lastUpdateData: Date.now()
                    };

                    setAboutMe(newData);
                    localStorage.setItem('about_me', JSON.stringify(newData));
                } catch {
                    setAboutMe([]);
                }
            };

            loadData();
        }
    }, [aboutMe]);

    if (aboutMe) {
        return (
            <div className={'grid grid-cols-10 my-2 gap-4'}>
                <img className={'col-span-3 w-full shadow-hero'} src={hero} alt="Luke Skywalker"/>
                <p className={'col-span-7 col-start-4 text-3xl text-justify leading-normal tracking-widest'}>
                    <b>Name: {aboutMe.name}</b><br/>
                    Birth Year: {aboutMe.birth_year}<br/>
                    Gender: {aboutMe.gender}<br/>
                    Height: {aboutMe.height}cm<br/>
                    Mass: {aboutMe.mass}kg<br/>
                    Homeworld: {aboutMe.homeworld}
                </p>
            </div>
        );
    } else {
        return (
            <p className={'text-3xl text-justify leading-normal tracking-widest flex items-center gap-2'}>
                <span className={'w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'}></span>
                <span>Loading...</span>
            </p>
        );
    }
};

export default AboutMe;