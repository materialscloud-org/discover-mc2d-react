import "./App.css";

import MaterialsCloudHeader from "mc-react-header";

function App() {
  return (
    <MaterialsCloudHeader
      activeSection={"discover"}
      breadcrumbsPath={[
        { name: "Discover", link: "https://www.materialscloud.org/discover" },
        {
          name: "Materials Cloud two-dimensional crystals database",
          link: null,
        },
      ]}
    >
      <div className="App">
        mc2d
      </div>
    </MaterialsCloudHeader>
  );
}

export default App;
