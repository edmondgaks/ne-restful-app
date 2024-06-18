import { useEffect, useState } from "react";
import { API_DATA_LIMIT, API_URL, sendRequest } from "../utils/Api";
import TableComponent from "../components/table/TableComponent";
import TablePagination from "../components/table/TablePagination";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const changePage = async (newPage) => {
    if (newPage !== data.currentPage) {
      setLoading(true);
      await fetchTableData(newPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchTableData(0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchTableData = async (page) => {
    let response = await sendRequest(
      API_URL + `/books?page=${page}&limit=${API_DATA_LIMIT}`,
      "GET"
    );
    const responseData = response?.data?.data?.data;
    setData(responseData);
    setFilteredData(responseData);
    setCurrentPage(response?.data?.data?.currentPage);
    setPages(response?.data?.data?.totalPages);
    return response;
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const transformData = (data) => {
    return data.map((item) => {
      return {
        ID: item?.id,
        name: item?.name,
        Author: item?.author,
        Publisher: item?.publisher,
        PublicationYear: item?.publicationYear,
        Subject: item?.subject
      };
    });
  };

  const tableHeaders = [
    "ID",
    "Name",
    "Author",
    "Publisher",
    "Publication Year",
    "Subject"
  ];

  return (
    <>
      <h2>BOOKS</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search books..."
        className="outline-none py-2"
      />
      <TableComponent
        headers={tableHeaders}
        data={transformData(filteredData)}
        loading={loading}
      />
      <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination>
    </>
  );
};
