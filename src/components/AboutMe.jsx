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
            <div className={"d-flex flex-column flex-md-row gap-3 align-items-start mb-2"}>
                <img className="w-25" src={hero} alt="Luke Skywalker"/>
                <p className="far-galaxy">
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
            <p className="far-galaxy">
                <span className="spinner-border spinner-border-sm"></span>
                <span className="spinner-grow spinner-grow-sm">Loading...</span>
            </p>
        );
    }
};

export default AboutMe;