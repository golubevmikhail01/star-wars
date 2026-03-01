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

    return (
        <form className={`w-4/5 my-0 mx-auto rounded-[5px] bg-[#f2f2f2] p-5`} onSubmit={(e) => {
            e.preventDefault();
        }}>
            <label className={`w-full text-danger`}>First Name
                <input className={`text-black border w-full p-3 border-[#ccc] rounded-[4px] mt-1.5 mb-4 resize-y`}
                       type="text"
                       name="firstname" placeholder="Your first name..."/>
            </label>
            <label className={`w-full text-danger`}>Last Name
                <input className={`text-black border w-full p-3 border-[#ccc] rounded-[4px] mt-1.5 mb-4 resize-y`}
                       type="text"
                       name="lastname" placeholder="Your last name..."/>
            </label>
            <label className={`w-full text-danger`}>Planet
                <select className={`border w-full text-black p-3 border-[#ccc] rounded-[4px] mt-1.5 mb-4 resize-y`}
                        name="planet">{
                    planets.planets.map(item => <option value={item} key={item}>{item}</option>)
                }
                </select>
            </label>
            <label className={`w-full text-danger`}>Subject
                <textarea
                    className={`text-black border h-52 w-full p-3 border-[#ccc] rounded-[4px] mt-1.5 mb-4 resize-y`}
                    name="subject" placeholder="Write something..."/>
            </label>
            <button
                className={`bg-[#4CAF50] text-white py-3 px-5 border-none rounded-[4px] cursor-pointer hover:bg-[#45a049]`}
                type="submit">Submit
            </button>
        </form>
    )
};

export default Contact;