import AddMovieForm from "@/components/AddMovie/AddMovieForm";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";

function AddMovie() {
  return (
    <>
      <Provider center>
        <Navbar />
        <AddMovieForm />
      </Provider>
    </>
  );
}

export default AddMovie;
