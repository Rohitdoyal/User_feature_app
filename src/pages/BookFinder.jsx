import React,  { useState, useEffect }from "react";
import axios from "axios";
import Profile from "../components/Profile.jsx";



const BookFinder = () => {

  const [searchQuery, setSearchQuery] = useState("s");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [publisher, setPublisher] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [language, setLanguage] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = { name: "Alex", occupation: "College Student", email: "alex@books.com" };

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Fetch books based on the title
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(
          searchQuery
        )}`
      );
      const fetchedBooks = response.data.docs;

      setBooks(fetchedBooks);

      // Apply client-side filtering
      const filtered = fetchedBooks.filter((book) => {
        const matchesAuthor = author
          ? book.author_name?.some((name) =>
              name.toLowerCase().includes(author.toLowerCase())
            )
          : true;
        const matchesPublisher = publisher
          ? book.publisher?.some((pub) =>
              pub.toLowerCase().includes(publisher.toLowerCase())
            )
          : true;
        const matchesYear =
          (yearFrom ? book.first_publish_year >= yearFrom : true) &&
          (yearTo ? book.first_publish_year <= yearTo : true);
        const matchesLanguage = language
          ? book.language?.includes(language)
          : true;

        return matchesAuthor && matchesPublisher && matchesYear && matchesLanguage;
      });

      setFilteredBooks(filtered);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };
  //   // Automatically trigger search when the page loads
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Book Finder</h1>
      <Profile user={user} />
      

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Title"
          className="border p-2 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Author"
          className="border p-2 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Type"
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Publisher"
          className="border p-2 rounded"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <input
          type="number"
          placeholder="From Year"
          className="border p-2 rounded"
          value={yearFrom}
          onChange={(e) => setYearFrom(e.target.value)}
        />
        <input
          type="number"
          placeholder="To Year"
          className="border p-2 rounded"
          value={yearTo}
          onChange={(e) => setYearTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Language"
          className="border p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Search Books
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Displaying Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
            
              <h3 className="font-bold text-xl">{book.title || "N/A"}</h3>
              <p className="text-sm text-gray-600">
                Author: {book.author_name ? book.author_name.join(", ") : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Publisher: {book.publisher ? book.publisher.join(", ") : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Year: {book.first_publish_year || "N/A"}
              </p>
            </div>
          ))
        ) : (
          !loading && <p className="col-span-full text-center">No books found</p>
        )}
      </div>
    </div>
  );
};



export default BookFinder;
