import { ethers } from "ethers";
import haversine from "haversine-distance";
import React, { useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

export default function App() {
    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Please install MetaMask!");
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected", accounts[0]);
            fetchGreetings();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGreetings = async () => {
        let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            Greeter.abi,
            provider
        );

        const greeting = await contract.greet();
        console.log(greeting);
    };

    useEffect(() => {
        // connectWallet();

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            const pointA = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            const pointB = {
                lat: 10,
                lng: 45,
            };

            console.log(haversine(pointA, pointB) / 1000);
        });
    }, []);

    const setContract = async (text) => {
        try {
            let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
            const { ethereum } = window;

            if (!ethereum) {
                alert("Please install MetaMask!");
                return;
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                Greeter.abi,
                signer
            );

            await contract.setGreeting(text);
            fetchGreetings();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={() => setContract("Helloooooooo!")}>Hello!</button>
        </div>
    );
}
