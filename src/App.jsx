/* eslint-disable react/jsx-key */
import { useState } from "react";

function App() {
  const [coutries, setCoutries] = useState([]);
  const [selectedCoutry, setSelectedCoutry] = useState(null);
  const [nameCoutry, setNameCoutry] = useState("");

  const fetchCoutries = async () => {
    try {
      const res = await fetch(`
      https://restcountries.com/v3.1/translation/${nameCoutry}`);
      const data = await res.json();
      console.log(data);
      setCoutries(data);
    } catch (error) {
      console.error("Error fetching data coutries", error);
    }
    setNameCoutry("");
  };
  const handleCoutry = (coutry) => {
    setSelectedCoutry(coutry);
  };

  const isMobile = window.innerWidth <= 700;

  return (
    <>
      <div className="flex flex-col  align-middl w-full h-screen">
        <h2 className="m-10 text-center text-xl">
          Vamos descobrir algums detalhes sobre os paises?
        </h2>
        <p className="text-center">busque o pais qual desejar saber mais...</p>
        <div className="flex flex-row justify-center">
          <input
            placeholder="digite o nome do pais"
            type="text"
            name="name"
            value={nameCoutry}
            required
            onChange={(e) => setNameCoutry(e.target.value)}
            className="w-40 mt-6 mb-6 p-2 flex justfy-center bg-gray-400 rounded"
          />
          <button
            className="bg-gray-700 p-2 w-18 h-12 mb-3 m-4 text-white rounded-3xl hover:bg-gray-800"
            onClick={() => {
              fetchCoutries();
              handleCoutry("");
            }}
          >
            buscar
          </button>
        </div>
        {coutries.map((coutry) => (
          <div
            key={coutry.name.common}
            className={`${
              isMobile
                ? "flex flex-col justify-center text-center m-4"
                : "flex flex-col justify-center text-center"
            }`}
          >
            <div
              className={`${
                isMobile
                  ? "flex flex-row justify-center align-middle"
                  : "flex flex-row justify-center mr-6"
              }`}
            >
              <p className="text-2xl text-center">{coutry.name.common}</p>

              <img
                className="w-10 ml-4 mb-4 text-center"
                src={coutry.coatOfArms.svg}
                alt=""
              />
            </div>

            <details
              onClick={() => handleCoutry(coutry)}
              className={`${isMobile ? "mr-2" : "mr-10"}`}
            >
              {selectedCoutry && (
                <div
                  className={`${
                    isMobile
                      ? "inline-flex flex-col text-start m-10 p-2 font-medium"
                      : "inline-flex flex-col text-start m-10 ml-36 p-2 font-medium"
                  }`}
                >
                  <p className="mb-4">
                    {selectedCoutry.name.official} - {selectedCoutry.car.signs}
                  </p>
                  <img
                    className="w-48 mb-4"
                    src={selectedCoutry.flags.png}
                    alt={`Bandeira do pais ${selectedCoutry.name.common}`}
                  />
                  <p className="mb-2">Região: {selectedCoutry.subregion}</p>
                  <p className="mb-2">
                    Continente: {selectedCoutry.continents}
                  </p>
                  <p className="mb-2">
                    Capital do país: {selectedCoutry.capital}
                  </p>
                  <p className="mb-2">
                    População habitacional: {selectedCoutry.population}
                  </p>
                </div>
              )}
            </details>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
