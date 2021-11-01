import DataTable from "components/DataTable";
import Footer from "components/Footer";
import NaveBar from "components/NaveBar";

function App() {
  return (
    <>
      <NaveBar />
      <div className='container'>
        <h1 className="text-primary">Olá mundo!</h1>
        <DataTable />
      </div>
      <Footer />
    </>
  );
}

export default App;
