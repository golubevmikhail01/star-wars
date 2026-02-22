import {useEffect, useState} from "react";
import {isFresh} from "../utils/functions.js";
import {baseURL, THIRTY_DAYS} from "../utils/constants.js";

const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        try {
            const data = localStorage.getItem('planets');
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (!planets || !isFresh(planets, THIRTY_DAYS)) {
            fetch(`${baseURL}/v1/planets`)
                .then(res => res.json())
                .then(data => {
                    const newData = {
                        planets: data.map(planet => planet.name),
                        lastUpdateData: Date.now()
                    }
                    setPlanets(newData);
                    localStorage.setItem('planets', JSON.stringify(newData));

                })
                .catch(() => setPlanets([]))
        }
    }, [planets])

    if (planets) {
        return (
            <div className="container">
                <form>
                    <label>First Name</label>
                    <input type="text" placeholder="Your name.."/>

                    <label>Last Name</label>
                    <input type="text" placeholder="Your last name.."/>

                    <label>Planet</label>
                    <select>
                        {planets.planets.map(planet => (
                            <option key={planet} value={planet}>
                                {planet}
                            </option>
                        ))}
                    </select>

                    <label>Subject</label>
                    <textarea placeholder="Write something.."></textarea>

                    <input type="submit" value="Submit" className="btn btn-danger border-warning"/>
                </form>
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

export default Contact;