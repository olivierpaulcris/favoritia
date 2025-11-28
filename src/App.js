import React, { useState, useMemo } from "react";
import {
  IconBrandAppleArcade,
  IconBook,
  IconMovie,
  IconDeviceTv,
  IconDashboard,
  IconMusic,
  IconMenu2,
  IconX,
  IconMapPin,
  IconBallFootball,
} from "@tabler/icons-react";
import Card from "./components/card";
import data from "./data/data.js";
import "./App.css";

const groupData = (flatData) => {
  const grouped = flatData.reduce((acc, item) => {
    const { category, subcategory } = item;
    if (!category || !subcategory) return acc;

    if (!acc[category]) acc[category] = {};
    if (!acc[category][subcategory]) acc[category][subcategory] = [];

    acc[category][subcategory].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b)
  );

  return sortedCategories.map((categoryTitle) => {
    let subcategories = Object.keys(grouped[categoryTitle]);

    if (categoryTitle === "Video Games") {
      subcategories.sort((a, b) => {
        const latestA = grouped[categoryTitle][a]
          .map((item) => new Date(item.date))
          .sort((d1, d2) => d2 - d1)[0];
        const latestB = grouped[categoryTitle][b]
          .map((item) => new Date(item.date))
          .sort((d1, d2) => d2 - d1)[0];
        return latestB - latestA;
      });
    } else {
      subcategories.sort((a, b) => a.localeCompare(b));
    }

    return {
      title: categoryTitle,
      items: subcategories.map((subcategoryTitle) => ({
        title: subcategoryTitle,
        items: grouped[categoryTitle][subcategoryTitle],
      })),
    };
  });
};

function App() {
  const structuredData = useMemo(() => groupData(data), []);
  const [activeSection, setActiveSection] = useState(
    structuredData[0]?.title || ""
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCurrentPageStyle = (section) => {
    return activeSection === section
      ? "text-blue-600 border-blue-600 active"
      : "border-transparent hover:text-gray-600 hover:border-gray-300";
  };
  const getIconSection = (section) => {
    switch (section) {
      case "Video Games":
        return <IconBrandAppleArcade stroke={2} />;
      case "Books":
        return <IconBook stroke={2} />;
      case "Movies":
        return <IconMovie stroke={2} />;
      case "TV Series":
        return <IconDeviceTv stroke={2} />;
      case "Music":
        return <IconMusic stroke={2} />;
      case "Places":
        return <IconMapPin stroke={2} />;
      case "Sports":
        return <IconBallFootball stroke={2} />;
      default:
        return <IconDashboard stroke={2} />;
    }
  };
  const filteredData = structuredData.find(
    (section) => section.title === activeSection
  );
  function countItemsPerCategory(seccion) {
    let totalItems = 0;
    seccion.items.forEach((sub) => {
      if (sub.items && Array.isArray(sub.items)) {
        totalItems += sub.items.length;
      }
    });
    return totalItems || 0;
  }

  return (
    <div className="App min-h-screen bg-gray-100">
      <header className="shadow-sm bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img
                className="rounded-full w-24 h-24 sm:w-28 sm:h-28 border-4 border-white shadow-md"
                src="https://avatars.githubusercontent.com/u/28810186?s=400&u=f3f6ced522256a5be87104de7fe7d64aafaa4830&v=4"
                alt="Profile picture"
              />
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Paul Cristerna
                </h1>
                <p className="text-sm text-gray-500">
                  Culiacán, Sinaloa, México
                </p>
              </div>
            </div>

            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Abrir menú"
              >
                {isMenuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 w-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className={`${isMenuOpen ? "block" : "hidden"} sm:block`}>
            <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:-mb-px text-sm font-medium text-center text-gray-500">
              {structuredData.map((section) => (
                <li className="me-2" key={section.title}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(section.title);
                      setIsMenuOpen(false); // NUEVO: Cierra el menú al hacer clic
                    }}
                    className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group w-full sm:w-auto ${getCurrentPageStyle(
                      section.title
                    )}`}
                  >
                    {getIconSection(section.title)}
                    <span className="mx-2">
                      {section.title} ({countItemsPerCategory(section)})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="w-full bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {filteredData ? (
            <div>
              {filteredData.items.map((category) => (
                <section key={category.title} className="mb-8">
                  <div className="px-4 sm:px-0">
                    <h2 className="text-2xl font-bold text-gray-800 text-left mb-3">
                      {category.title}{" "}
                      <span className="font-normal text-gray-500">
                        ({category.items.length})
                      </span>
                    </h2>
                    <hr className="border-t border-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mt-4 px-4 sm:px-0">
                    {category.items
                      .slice()
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((item) => (
                        <Card
                          key={item.title + item.author}
                          title={item.title}
                          author={item.author}
                          img={item.img}
                          date={item.date}
                          score={item.score}
                        />
                      ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No hay datos para mostrar.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
