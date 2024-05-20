import SearchBar from "./SearchBar/SearchBar";
import css from "./App.module.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageModal from "./ImageModal/ImageModal";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import axios, { AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { ModalTypes,ArticleTypes,ApiArticleTypes } from "./App.types";


export default function App() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState<ModalTypes>({regular: "", alt_description: "", likes: 0,});
  const [articles, setArticles] =  useState<ArticleTypes[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(1);
  const [topic, setTopic] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number|null>(null);

  function openModal(item:ModalTypes):void {
    setIsOpen(true);
    setModalItem(item);
  }

  function closeModal():void {
    setIsOpen(false);
  }
  useEffect(() => {
    if (topic === "") {
      return;
    }

      async function searchImg<T extends object>():  Promise<void|string> {
      try {
        setError(false);
        setLoading(true);
        const data: T = await fetchArticles<T>(topic, pageCount);
        if ((data as ArticleTypes).total_pages === 0) {
          return toast.error("No results!");
        }
        else{
        setTotalPages((data as ApiArticleTypes).total_pages);
        setArticles((prevArticles) => [...prevArticles, ...(data as ApiArticleTypes).results]);

        }


      } catch (error) {
        toast.error("Error!!!");
        setError(true);
        setArticles([]);
        setTotalPages(null);
        setPageCount(1);
        setTopic("");
        
      } finally {
        setLoading(false);
      }
    };
    searchImg();
    if (pageCount == totalPages) {
      toast.error("These are all found pictures for your request!");
    }
  }, [topic, pageCount]);

  const handleSearch = async (topic:string):Promise<void> => {
    setArticles([]);
    setPageCount(1);
    setTopic(topic);
  };

  const handleSearchAdd = async ():Promise<void> => {
    setPageCount((prevCount) => prevCount + 1);
  };

  async function fetchArticles <T>(topic:string, pageCount:number):Promise<T> {
    const itemParam = new URLSearchParams({
      client_id: "zswY079qTyGv_X4mnQxlTfwxYMYdyFlo-S6rA35ODMI",
      query: topic,
      page: pageCount.toString(),
      orientation: "landscape",
    });
    const collection:AxiosResponse<T> = await axios.get<T>(
      `https://api.unsplash.com/search/photos?${itemParam}`
    );

    return collection.data;
  }

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}
      {articles.length > 0 && (
        <ImageGallery items={articles} openModal={openModal} />
      )}

      <Toaster position="top-right" />
      <ImageModal img={modalItem} closeModal={closeModal} modalIsOpen={modalIsOpen}/>
      
      {loading && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}
      {pageCount < totalPages! && <LoadMoreBtn onLoadMore={handleSearchAdd} />}
    </div>
  );
}
