import {baseURL} from "../utils/constants.js";
import {useEffect, useState} from "react";
import hero from "../assets/main.jpg";

const AboutMe = () => {
    const [aboutMe, setAboutMe] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(`${baseURL}/v1/peoples/1`);
                const data = await res.json();

                const planetRes = await fetch(`${baseURL}/v1/planets/${data.homeworld}`);
                const planet = await planetRes.json();

                setAboutMe({
                    ...data,
                    homeworld: planet.name,
                });
            } catch {
                setAboutMe('Error loading about me');
            }
        };
        loadData();
    }, [])

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