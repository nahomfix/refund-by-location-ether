import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";
import Casino from "./artifacts/contracts/Casino.sol/Casino.json";

const App = () => {
    const [lastWinner, setLastWinner] = useState(0);
    const [timer, setTimer] = useState(0);
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const voteNumber = (number) => {
        console.log(number);
    };

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
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOwner = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            Casino.abi,
            provider
        );

        const owner = await contract.totalBet();
        console.log(owner.value);
    };

    useEffect(() => {
        connectWallet();
        fetchOwner();
    }, []);

    return (
        <div className="main-container">
            <h1>Bet for your best number and win huge amounts of Ether</h1>
            <div className="block">
                <h4>Timer:</h4> &nbsp;
                <span> {timer}</span>
            </div>
            <div className="block">
                <h4>Last winner:</h4> &nbsp;
                <span>{lastWinner}</span>
            </div>
            <hr />
            <h2>Vote for the next number</h2>
            <ul>
                <li
                    onClick={() => {
                        voteNumber(1);
                    }}
                >
                    1
                </li>
                <li
                    onClick={() => {
                        voteNumber(2);
                    }}
                >
                    2
                </li>
                <li
                    onClick={() => {
                        voteNumber(3);
                    }}
                >
                    3
                </li>
                <li
                    onClick={() => {
                        voteNumber(4);
                    }}
                >
                    4
                </li>
                <li
                    onClick={() => {
                        voteNumber(5);
                    }}
                >
                    5
                </li>
                <li
                    onClick={() => {
                        voteNumber(6);
                    }}
                >
                    6
                </li>
                <li
                    onClick={() => {
                        voteNumber(7);
                    }}
                >
                    7
                </li>
                <li
                    onClick={() => {
                        voteNumber(8);
                    }}
                >
                    8
                </li>
                <li
                    onClick={() => {
                        voteNumber(9);
                    }}
                >
                    9
                </li>
                <li
                    onClick={() => {
                        voteNumber(10);
                    }}
                >
                    10
                </li>
            </ul>
        </div>
    );
};

export default App;
