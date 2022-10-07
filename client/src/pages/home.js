import React, {useState} from 'react';
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import VariableIcon from "@heroicons/react/24/outline/VariableIcon";
import validator from "validator";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import background from "../resources/images/background.png"
import java from "../resources/images/java.png"
import csharp from "../resources/images/c_sharp.png"
import logo from "../resources/images/logo.png"
import sql from "../resources/images/sql.png"
import "../styles/home.css"

const inputStyle = {
    classNameError: "relative bg-red-600 rounded-full inline focus:ring-stone-500 " +
                    "focus:border-stone-500 w-150 pr-10 sm:text-sm " +
                    "border-gray-300 rounded-md border-red-300" +
                    "text-red-900 placeholder-red-300 focus:outline-none " +
                    "focus:ring-red-500 focus:border-red-500",

    classNameSuccess: "relative bg-green-600 rounded-full inline focus:ring-stone-500 " +
                     "focus:border-stone-500 w-150 pr-10 sm:text-sm " +
                     "border-gray-300 rounded-md",
    classNameDefault: "relative bg-white rounded-full inline focus:ring-stone-500 " +
                      "focus:border-stone-500 w-150 pr-10 sm:text-sm " +
                      "border-gray-300 rounded-md"
}

const Home = () => {
    let [palindromeJavaScript, setPalindromeJavaScript] = useState("");
    let [palindromeSQL, setPalindromeSQL] = useState("");
    let [palindromeCSharp, setPalindromeCSharp] = useState("");
    let [errorPalindromeJavaScript, setErrorPalindromeJavaScript] = useState(false);
    let [errorPalindromeSQL, setErrorPalindromeSQL] = useState(false);
    let [errorPalindromeCSharp, setErrorPalindromeCSharp] = useState(false);
    let javascriptRef = React.createRef();
    let sqlRef = React.createRef();
    let cSharpRef = React.createRef();

    const handleOnChangeJavaScript = (e) => {
        let userInput = e.target.value;
        if(!isPalindrome(userInput)){
            javascriptRef.current.className = inputStyle.classNameError;
            setErrorPalindromeJavaScript(true);
        } else {
            javascriptRef.current.className = inputStyle.classNameSuccess;
            setErrorPalindromeJavaScript(false);
        }
        if(userInput.length < 1){
            javascriptRef.current.className = inputStyle.classNameDefault;
        }
        setPalindromeJavaScript(e.target.value);
    }

    const isPalindrome = (input) => {
        if(input.length > 0){
            let clean = input.split(" ").join("").toLowerCase();
            let length = clean.length;
            let forward = 0;
            let backward = length - 1;
            while (backward > forward) {
                let forwardChar = clean.charAt(forward++);
                let backwardChar = clean.charAt(backward--);
                if (forwardChar !== backwardChar)
                    return false;
            }
            return true;
        }
    }

    const handleOnChangeSQL = (e) => {
        let userInput = e.target.value;
        if(userInput.length < 1){
            sqlRef.current.className = inputStyle.classNameDefault;
        }
        setPalindromeSQL(userInput);
    }

    const handleOnClickSQLButton = (e) => {
        if(palindromeSQL.length > 0){
            let palindrome = fetch("http://localhost:5152/api/SQLPalindrome", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(palindromeSQL)
            }).then(response => response.json()).then(data => {
                if(data){
                    sqlRef.current.className = inputStyle.classNameSuccess;
                } else {
                    sqlRef.current.className = inputStyle.classNameError;
                }
                console.log("Is Palindrome: ", data);
            });
        }
    }

    const handleOnChangeCSharp = (e) => {
        let userInput = e.target.value;
        if(userInput.length < 1){
            cSharpRef.current.className = inputStyle.classNameDefault;
        }
        setPalindromeCSharp(userInput);
    }

    const handleOnClickCSharpGoButton = (e) => {
        if(palindromeCSharp.length > 0){
            let palindrome = fetch("http://localhost:5152/api/Palindrome", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(palindromeCSharp)
            }).then(response => response.json()).then(data => {
                if(data){
                    cSharpRef.current.className = inputStyle.classNameSuccess;
                } else {
                    cSharpRef.current.className = inputStyle.classNameError;
                }
                console.log("Is Palindrome: ", data);
            });
        }
    }

    return (
        <div className={"min-h-full"}>
            <h1 className="text-3xl text-white justify-center align-center py-5 px-10 font-bold"
            style={{margin: "auto", textAlign: "center"}}
            >
                PALINDROME TEST
            </h1>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", justifyItems: "center",
                         width: "100%", height: "600px",
                         backgroundImage: `url(${background})`,
                         backgroundRepeat: "repeat"}}>
                <div className="widgets-container border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
                     style={{width: "85%", height: 400, alignSelf: "center", justifyContent: "center"}}
                >
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                         className="mt-1 relative rounded-md shadow-sm inline-block align-center">
                        <div className={"relative left-5"} style={{display: "flex", justifyContent: "center", justifyItems: "center",
                            width: "70px", height: "70px",
                            margin: 20,
                            backgroundImage: `url(${java})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"}}>
                        </div>
                        <div className="relative left-8 mt-1 relative inline-block rounded-md shadow-sm">
                            <div className="relative mt-1 flex items-center">
                                <div style={{zIndex: 9999}} className="absolute left-4 top-1 inset-y-0 left-flex py-1.5 pr-1.2">
                                    <h2 style={{fontSize: 28}} className="inline-flex items-center rounded px-2 font-sans text-sm font-medium text-stone">
                                        A
                                    </h2>
                                </div>
                                <input
                                    type="text"
                                    name="a"
                                    id="a"
                                    ref={javascriptRef}
                                    onChange={handleOnChangeJavaScript}
                                    style={{textAlign: "center", fontSize: 20, textTransform: "uppercase"}}
                                    className="relative rounded-full inline focus:ring-stone-500 focus:border-stone-500 w-150 pr-10 sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <span className="sm:ml-5" style={{width: 140}}>

                        </span>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                         className="mt-1 relative rounded-md shadow-sm inline-block align-center">
                        <div style={{display: "flex", justifyContent: "center", justifyItems: "center",
                            width: "100px", height: "70px",
                            margin: 20,
                            backgroundImage: `url(${sql})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"}}>
                        </div>
                        <div className="relative mt-1 relative inline-block rounded-md shadow-sm">
                            <div className="relative mt-1 flex items-center">
                                <div style={{zIndex: 9999}} className="absolute left-4 top-1 inset-y-0 left-flex py-1.5 pr-1.2">
                                    <h2 style={{fontSize: 28}} className="inline-flex items-center rounded px-2 font-sans text-sm font-medium text-stone">
                                        B
                                    </h2>
                                </div>
                                <input
                                    type="text"
                                    name="b"
                                    id="b"
                                    ref={sqlRef}
                                    onChange={handleOnChangeSQL}
                                    style={{textAlign: "center", fontSize: 20, textTransform: "uppercase"}}
                                    className="relative rounded-full inline focus:ring-stone-500 focus:border-stone-500 w-150 pr-10 sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <span className="sm:ml-5">
                          <button
                              type="button"
                              style={{color: "green", fontSize: 24}}
                              onClick={handleOnClickSQLButton}
                              className="inline-flex w-250 items-center px-8 py-2 border border-stone rounded-md shadow-sm text-sm font-medium font-bold text-green bg-white-600 hover:bg-white-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white-500"
                          >
                            GO
                          </button>
                        </span>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                         className="mt-1 relative rounded-md shadow-sm inline-block align-center">
                        <div style={{display: "flex", justifyContent: "center", justifyItems: "center",
                            width: "90px", height: "70px",
                            margin: 25,
                            backgroundImage: `url(${csharp})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"}}>
                        </div>
                        <div className="relative mt-1 relative inline-block rounded-md shadow-sm">
                            <div className="relative mt-1 flex items-center">
                                <div style={{zIndex: 9999}} className="absolute left-4 top-1 inset-y-0 left-flex py-1.5 pr-1.2">
                                    <h2 style={{fontSize: 28}} className="inline-flex items-center rounded px-2 font-sans text-sm font-medium text-stone">
                                        C
                                    </h2>
                                </div>
                                <input
                                    type="text"
                                    name="c"
                                    id="c"
                                    ref={cSharpRef}
                                    onChange={handleOnChangeCSharp}
                                    style={{textAlign: "center", fontSize: 20, textTransform: "uppercase"}}
                                    className="relative rounded-full inline focus:ring-stone-500 focus:border-stone-500 w-150 pr-10 sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <span className="sm:ml-5">
                          <button
                              type="button"
                              style={{color: "green", fontSize: 24}}
                              onClick={handleOnClickCSharpGoButton}
                              className="inline-flex w-250 items-center px-8 py-2 border border-stone rounded-md shadow-sm text-sm font-medium font-bold text-green bg-white-600 hover:bg-white-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white-500"
                          >
                            GO
                          </button>
                        </span>
                    </div>
                </div>
                <div style={{margin:10, display: "flex", alignSelf: "center",
                    width: "400px", height: "120px", backgroundColor: "#1a2033"}}>
                    <div style={{
                        width: "350px", height: "100px",
                        backgroundImage: `url(${logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat", alignSelf: "center"}}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;