import { useState, useRef } from "react";
import MathJax from "react-mathjax";
import CYK from "./CYK";

function App() {
  const [grammar, setGrammar] = useState("");
  const [word, setWord] = useState("");
  const [grammarInput, setGrammarInput] = useState(
    "S -> AB | BC\nA -> BA | a\nB -> CC | b\nC -> AB | a"
  );
  const [wordInput, setWordInput] = useState("ababa");

  const timeComplexity = "O(n^3 · |G|)",
    wordLength = "n",
    grammarSize = "|G|";

  return (
    <div className="grid">
      <div className="w-3/4 mt-10 ml-20 mb-10">
        <h1 className="text-5xl font-bold mb-10 text-black">CYK Calculator</h1>
        <p className="text-black-500">
          <MathJax.Provider>
            The Cocke-Younger-Kasami algorithm (also called as CYK algorithm) is
            an efficient parsing algorithm for context free grammars in the
            Chomsky Normal Form (CNF). The algorithm uses dynamic programming to
            calculate a table of possible states using the characters of the
            word and the given grammar. It has a worst-case running time of{" "}
            <MathJax.Node inline formula={timeComplexity} /> where{" "}
            <MathJax.Node inline formula={wordLength} /> is the length of the
            word and <MathJax.Node inline formula={grammarSize} /> is the size
            of the given grammar.
          </MathJax.Provider>
        </p>
      </div>
      <div className="md:flex md:items-center mb-3 mt-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Grammar
          </label>
        </div>
        <div className="md:w-2/3 max-w-md">
          <textarea
            className="bg-gray-100 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-40"
            id="inline-full-name"
            type="text"
            value={grammarInput}
            onChange={(e) => setGrammarInput(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-3 mt-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Word
          </label>
        </div>
        <div className="md:w-2/3 max-w-md">
          <input
            className="bg-gray-100 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="inline-full-name"
            type="text"
            value={wordInput}
            onChange={(e) => {
              setWordInput(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mt-6">
        <div className="mx-auto">
          <button
            onClick={() => {
              setGrammar(grammarInput);
              setWord(wordInput);
            }}
            className="shadow bg-black hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Generate Table
          </button>
        </div>
      </div>
      {grammar !== "" && word !== "" ? (
        <CYK grammar={grammar} word={word} />
      ) : null}
    </div>
  );
}

export default App;
